import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";

function VerifyOwnership({ itemsPerPage = 5 }) {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Dummy Data matching the image structure
  const dummyData = [
    {
      id: 1,
      caseId: "#2025-001",
      previousOwnerDetails: {
        owner: "Karma",
        cid: "14484848484",
      },
      newOwnerDetails: {
        owner: "Lemo",
        cid: "14484848484",
        contact: "77123456",
        transferType: "Ownership transfer",
        transferDate: "12.09.2025",
      },
      propertyDetails: {
        location: "Gelephu",
        size: "4 acres",
        status: "Verified",
        mapImage: "/assets/images/dummy_map.png",
      },
      blockchainProof: {
        txnHash: "0X123abc..789xyz",
      },
      supportingDocuments: [
        {
          name: "Ownership Proof.pdf",
          url: "/assets/documents/dummy_ownership_proof.pdf",
        },
        {
          name: "Agreement.docx",
          url: "/assets/documents/dummy_agreement.docx",
        },
      ],
    },
    {
      id: 2,
      caseId: "#2025-002",
      previousOwnerDetails: {
        owner: "Tashi",
        cid: "9876543210",
      },
      newOwnerDetails: {
        owner: "Dawa",
        cid: "1122334455",
        contact: "77654321",
        transferType: "Inheritance",
        transferDate: "20.09.2025",
      },
      propertyDetails: {
        location: "Paro",
        size: "2 hectares",
        status: "Pending",
        mapImage: "/assets/images/dummy_map.png",
      },
      blockchainProof: {
        txnHash: "0Xdef456..ghijkl",
      },
      supportingDocuments: [
        {
          name: "Death Certificate.pdf",
          url: "/assets/documents/dummy_death_cert.pdf",
        },
      ],
    },
    {
      id: 3,
      caseId: "#2025-003",
      previousOwnerDetails: {
        owner: "Sonam",
        cid: "5555666677",
      },
      newOwnerDetails: {
        owner: "Dechen",
        cid: "8899001122",
        contact: "17123456",
        transferType: "Gift",
        transferDate: "25.09.2025",
      },
      propertyDetails: {
        location: "Thimphu",
        size: "1 acre",
        status: "Rejected",
        mapImage: "/assets/images/dummy_map.png",
      },
      blockchainProof: {
        txnHash: "0Xghi789..mnopqr",
      },
      supportingDocuments: [
        { name: "Gift Deed.pdf", url: "/assets/documents/dummy_gift_deed.pdf" },
        {
          name: "CID Copies.pdf",
          url: "/assets/documents/dummy_cid_copies.pdf",
        },
      ],
    },
    {
      id: 4,
      caseId: "#2025-003",
      previousOwnerDetails: {
        owner: "Sonam",
        cid: "5555666677",
      },
      newOwnerDetails: {
        owner: "Dechen",
        cid: "8899001122",
        contact: "17123456",
        transferType: "Gift",
        transferDate: "25.09.2025",
      },
      propertyDetails: {
        location: "Thimphu",
        size: "1 acre",
        status: "Rejected",
        mapImage: "/assets/images/dummy_map.png",
      },
      blockchainProof: {
        txnHash: "0Xghi789..mnopqr",
      },
      supportingDocuments: [
        { name: "Gift Deed.pdf", url: "/assets/documents/dummy_gift_deed.pdf" },
        {
          name: "CID Copies.pdf",
          url: "/assets/documents/dummy_cid_copies.pdf",
        },
      ],
    },
    {
      id: 5,
      caseId: "#2025-003",
      previousOwnerDetails: {
        owner: "Sonam",
        cid: "5555666677",
      },
      newOwnerDetails: {
        owner: "Dechen",
        cid: "8899001122",
        contact: "17123456",
        transferType: "Gift",
        transferDate: "25.09.2025",
      },
      propertyDetails: {
        location: "Thimphu",
        size: "1 acre",
        status: "Rejected",
        mapImage: "/assets/images/dummy_map.png",
      },
      blockchainProof: {
        txnHash: "0Xghi789..mnopqr",
      },
      supportingDocuments: [
        { name: "Gift Deed.pdf", url: "/assets/documents/dummy_gift_deed.pdf" },
        {
          name: "CID Copies.pdf",
          url: "/assets/documents/dummy_cid_copies.pdf",
        },
      ],
    },
    {
      id: 6,
      caseId: "#2025-003",
      previousOwnerDetails: {
        owner: "Sonam",
        cid: "5555666677",
      },
      newOwnerDetails: {
        owner: "Dechen",
        cid: "8899001122",
        contact: "17123456",
        transferType: "Gift",
        transferDate: "25.09.2025",
      },
      propertyDetails: {
        location: "Thimphu",
        size: "1 acre",
        status: "Rejected",
        mapImage: "/assets/images/dummy_map.png",
      },
      blockchainProof: {
        txnHash: "0Xghi789..mnopqr",
      },
      supportingDocuments: [
        { name: "Gift Deed.pdf", url: "/assets/documents/dummy_gift_deed.pdf" },
        {
          name: "CID Copies.pdf",
          url: "/assets/documents/dummy_cid_copies.pdf",
        },
      ],
    },

    // Add more dummy data with the same structure if needed
  ];

  // Filtered data based on search query
  const filteredData = dummyData.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Pagination logic

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handleDetailsClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    setData(dummyData);
  }, []);

  return (
    <div className="p-4">
      <div className="rounded-lg hidden sm:flex justify-between items-center mb-6 top-0 bg-white z-10 shadow-md p-4">
        <div className="flex items-center gap-4">
          <h2 className=" col-span-full text-xl font-semibold text-gray-800 ">
            Land Records
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="relative">
              <FiUser
                className="text-2xl cursor-pointer mr-5"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div className="absolute right-5 mt-2 bg-white border rounded shadow-lg w-48 origin-top-right">
                  <ul className="py-2 flex flex-col items-center justify-center">
                    <li
                      className="block px-4 py-2 text-gray-700 hover:bg-[#003366] hover:text-white active:bg-[#003366] active:text-white transition-colors duration-200 cursor-pointer w-full text-left text-sm"
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </li>
                    <li
                      className="block px-4 py-2 text-gray-700 hover:bg-[#003366] hover:text-white active:bg-[#003366] active:text-white transition-colors duration-200 cursor-pointer w-full text-left text-sm"
                      onClick={() => navigate("/settings")}
                    >
                      Settings
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-xl rounded-lg overflow-x-auto">
        <div className="flex justify-between items-center w-full mb-4 p-4">
          <div /> {/* Empty div for spacing */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="peer px-3 py-2 border rounded-lg pl-8 w-full sm:w-64 text-sm text-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#003366]"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <FiSearch className="absolute left-2 top-2.5 text-gray-500 peer-focus:left-2.5 transition-all duration-300" />
          </div>
        </div>
        <table className="min-w-full leading-normal">
          <thead className="bg-gray-50">
            <tr className="text-gray-600 uppercase text-sm font-semibold">
              <th className="py-3 px-4 text-left border-b border-gray-200">
                Case ID
              </th>
              <th className="py-3 px-4 text-left border-b border-gray-200">
                Owner
              </th>
              <th className="py-3 px-4 text-left border-b border-gray-200">
                New Owner
              </th>
              <th className="py-3 px-4 text-left border-b border-gray-200">
                Status
              </th>
              <th className="py-3 px-4 text-left border-b border-gray-200">
                Transferred Date
              </th>
              <th className="py-3 px-4 text-center border-b border-gray-200">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {currentItems.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-100 transition-colors duration-150"
              >
                <td className="py-3 px-4 border-b border-gray-200">
                  {item.caseId}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {item.previousOwnerDetails.owner}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {item.newOwnerDetails.owner}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <span
                    className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full
                                        ${
                                          item.propertyDetails.status.toLowerCase() ===
                                          "verified"
                                            ? "bg-green-100 text-green-600"
                                            : item.propertyDetails.status.toLowerCase() ===
                                              "pending"
                                            ? "bg-yellow-100 text-yellow-600"
                                            : item.propertyDetails.status.toLowerCase() ===
                                              "rejected"
                                            ? "bg-red-100 text-red-600"
                                            : "bg-gray-100 text-gray-500"
                                        }`}
                  >
                    {item.propertyDetails.status}
                  </span>
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {item.newOwnerDetails.transferDate}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-center">
                  <button
                    onClick={() => handleDetailsClick(item)}
                    className="bg-[#003366] hover:bg-[#002952] text-white font-semibold py-2 px-4 rounded-md text-sm focus:outline-none focus:shadow-outline transition-colors duration-200"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        {/* Pagination with only Prev and Next buttons */}
        {filteredData.length > itemsPerPage && (
          <div className="flex justify-between items-center mt-5 px-6 py-3 bg-gray-50 rounded-b-lg">
            <span className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredData.length)} of{" "}
              {filteredData.length} entries
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-200 text-gray-700 px-4 py-1 rounded-md hover:bg-gray-300 focus:outline-none disabled:opacity-50 transition-colors duration-150"
              >
                Prev
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-[#142854] text-white px-4 py-1 rounded-md hover:bg-[#0f1d2d] focus:outline-none disabled:opacity-50 transition-colors duration-150"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative">
            <div className="px-6 py-4 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                Ownership Details
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedItem && (
                <>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">
                      New Owner Information
                    </h4>
                    <p>
                      <strong className="text-gray-700">Owner:</strong>{" "}
                      <span className="text-gray-600">
                        {selectedItem.newOwnerDetails?.owner || "N/A"}
                      </span>
                    </p>
                    <p>
                      <strong className="text-gray-700">CID:</strong>{" "}
                      <span className="text-gray-600">
                        {selectedItem.newOwnerDetails?.cid || "N/A"}
                      </span>
                    </p>
                    <p>
                      <strong className="text-gray-700">Contact No:</strong>{" "}
                      <span className="text-gray-600">
                        {selectedItem.newOwnerDetails?.contact || "N/A"}
                      </span>
                    </p>
                    <p>
                      <strong className="text-gray-700">Transfer Type:</strong>{" "}
                      <span className="text-gray-600">
                        {selectedItem.newOwnerDetails?.transferType || "N/A"}
                      </span>
                    </p>
                    <p>
                      <strong className="text-gray-700">Transfer Date:</strong>{" "}
                      <span className="text-gray-600">
                        {selectedItem.newOwnerDetails?.transferDate || "N/A"}
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">
                      Previous Owner Information
                    </h4>
                    <p>
                      <strong className="text-gray-700">Owner:</strong>{" "}
                      <span className="text-gray-600">
                        {selectedItem.previousOwnerDetails?.owner || "N/A"}
                      </span>
                    </p>
                    <p>
                      <strong className="text-gray-700">CID:</strong>{" "}
                      <span className="text-gray-600">
                        {selectedItem.previousOwnerDetails?.cid || "N/A"}
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">
                      Property Details
                    </h4>
                    <p>
                      <strong className="text-gray-700">Location:</strong>{" "}
                      <span className="text-gray-600">
                        {selectedItem.propertyDetails?.location || "N/A"}
                      </span>
                    </p>
                    <p>
                      <strong className="text-gray-700">Size:</strong>{" "}
                      <span className="text-gray-600">
                        {selectedItem.propertyDetails?.size || "N/A"}
                      </span>
                    </p>
                    <p>
                      <strong className="text-gray-700">Status:</strong>
                      <span
                        className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full ml-1
                                    ${
                                      selectedItem.propertyDetails?.status?.toLowerCase() ===
                                      "verified"
                                        ? "bg-green-100 text-green-600"
                                        : selectedItem.propertyDetails?.status?.toLowerCase() ===
                                          "pending"
                                        ? "bg-yellow-100 text-yellow-600"
                                        : selectedItem.propertyDetails?.status?.toLowerCase() ===
                                          "rejected"
                                        ? "bg-red-100 text-red-600"
                                        : "bg-gray-100 text-gray-500"
                                    }`}
                      >
                        {selectedItem.propertyDetails?.status || "N/A"}
                      </span>
                    </p>
                    {selectedItem.propertyDetails?.mapImage && (
                      <div className="mt-4">
                        <strong className="text-gray-700 block mb-2">
                          Property Map
                        </strong>
                        <img
                          src={selectedItem.propertyDetails.mapImage}
                          alt="Property Map"
                          className="rounded-md w-full h-auto"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">
                      Blockchain Information
                    </h4>
                    <p>
                      <strong className="text-gray-700">Txn Hash:</strong>{" "}
                      <span className="text-gray-600 break-words">
                        {selectedItem.blockchainProof?.txnHash || "N/A"}
                      </span>
                    </p>
                  </div>

                  {/* Box for Supporting Documents */}
                  <div className="col-span-full mt-4 p-4 border rounded-md bg-gray-50">
                    <h4 className="font-semibold text-gray-700 mb-2">
                      Supporting Documents
                    </h4>
                    {selectedItem.supportingDocuments &&
                    selectedItem.supportingDocuments.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {selectedItem.supportingDocuments.map((doc, index) => (
                          <li key={index} className="mb-2">
                            <div className="flex items-center space-x-2">
                              <svg
                                className="w-5 h-5 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M7 21h10a2 2 0 002-2V9a2 2 0 00-2-2h-10a2 2 0 00-2 2v10a2 2 0 002 2zM13 8l2 2m0-2l-2 2m3-3v5m-5-5v5"
                                ></path>
                              </svg>
                              <span>{doc.name || "Document"}</span>
                              <a
                                href={doc.url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-500 hover:underline flex items-center space-x-1"
                                download={doc.name}
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16v1a3 3 0 003 3h6a3 3 0 003-3v-1m3-4h-6m0 0l-3-3m3 3l3-3"
                                  ></path>
                                </svg>
                                <span className="text-xs">Download</span>
                              </a>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No supporting documents available.
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="px-6 py-4 border-t flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyOwnership;
