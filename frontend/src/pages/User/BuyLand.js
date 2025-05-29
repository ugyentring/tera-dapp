import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { FiMenu, FiUser } from "react-icons/fi";
import axios from "axios";

function BuyLand() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [showSidebarText, setShowSidebarText] = useState(
    window.innerWidth >= 1024
  );
  const [activeSidebarItem, setActiveSidebarItem] = useState(1);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [selectedBank, setSelectedBank] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [journalNumber, setJournalNumber] = useState("");
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const isFormValid =
    selectedBank && uploadedImage && journalNumber.trim() !== "";

  const itemsPerPage = 6;

  const [allTransactions, setAllTransactions] = useState([]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = allTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(allTransactions.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSidebarMobile = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarDesktop = () => {
    setSidebarOpen(!sidebarOpen);
    setShowSidebarText(!showSidebarText);
  };

  const openViewModal = (transaction) => {
    setSelectedTransaction(transaction);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedTransaction(null);
  };

  const openBuyModal = (transaction) => {
    setSelectedTransaction(transaction);
    setBuyModalOpen(true);
    setPurchaseSuccess(false); // Reset success on open
  };

  const closeBuyModal = () => {
    setBuyModalOpen(false);
    setSelectedBank("");
    setUploadedImage(null);
    setJournalNumber("");
    setPurchaseSuccess(false);
  };

  const handlePurchase = () => {
    if (isFormValid) {
      console.log("Purchasing:", selectedTransaction);
      setPurchaseSuccess(true);
    }
  };

  const closePurchaseSuccess = () => setPurchaseSuccess(false);

  const handleSidebarItemClick = (pageNumber) => {
    setActiveSidebarItem(pageNumber);
    navigate(
      pageNumber === 1
        ? "/dashboard"
        : pageNumber === 2
        ? "/transactions"
        : pageNumber === 3
        ? "/land-records"
        : "/land-disputes"
    );
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Fetch land records from the backend
  useEffect(() => {
    const fetchLandRecords = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/govtland/land-records"
        );
        setAllTransactions(response.data);
      } catch (error) {
        console.error("Failed to fetch land records", error);
      }
    };

    fetchLandRecords();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
      setShowSidebarText(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-row">
      <div className="flex-grow p-4 sm:p-8 pt-16">
        {/* Header for Desktop */}
        <div className="rounded-lg hidden sm:flex justify-between items-center mb-6 bg-white z-10 shadow-md p-4">
          <div className="flex items-center gap-4 ">
            <button onClick={toggleSidebarMobile} className="lg:hidden mr-4">
              <FiMenu className="text-2xl text-gray-700" />
            </button>
            <h1 className="font-semibold text-gray-800 ml-5">Sell Land</h1>
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
                        onClick={() => navigate("/user-profile")}
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
        {/* View Modal */}
        {viewModalOpen && selectedTransaction && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4 sm:p-6 overflow-y-auto">
            <div className="relative bg-white p-6 rounded-2xl shadow-2xl w-full max-w-4xl sm:w-11/12 md:w-10/12 lg:w-2/3 xl:w-1/2 max-h-[95vh] min-w-[60vw] overflow-y-auto">
              <button
                onClick={closeViewModal}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-red-600 hover:text-red-800"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                Transaction Overview
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Row 1 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Transaction Details
                  </h3>
                  <p>
                    <span className="font-semibold">Transaction ID:</span>{" "}
                    {selectedTransaction.id}
                  </p>
                  <p>
                    <span className="font-semibold">Type:</span>{" "}
                    {selectedTransaction.type}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {selectedTransaction.date}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Owner Information
                  </h3>
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {selectedTransaction.owner}
                  </p>
                </div>

                {/* Divider */}
                <div className="col-span-2">
                  <hr className="my-4 border-gray-300" />
                </div>

                {/* Row 2 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Buyer Information
                  </h3>
                  {selectedTransaction.buyerInfo ? (
                    <>
                      <p>
                        <span className="font-semibold">Name:</span>{" "}
                        {selectedTransaction.buyerInfo.name}
                      </p>
                      <p>
                        <span className="font-semibold">Email:</span>{" "}
                        {selectedTransaction.buyerInfo.email}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-500">N/A</p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Seller Information
                  </h3>
                  {selectedTransaction.sellerInfo ? (
                    <>
                      <p>
                        <span className="font-semibold">Name:</span>{" "}
                        {selectedTransaction.sellerInfo.name}
                      </p>
                      <p>
                        <span className="font-semibold">Email:</span>{" "}
                        {selectedTransaction.sellerInfo.email}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-500">N/A</p>
                  )}
                </div>

                {/* Divider */}
                <div className="col-span-2">
                  <hr className="my-4 border-gray-300" />
                </div>

                {/* Row 3 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Land Information
                  </h3>
                  <p>
                    <span className="font-semibold">Land ID:</span>{" "}
                    {selectedTransaction.id}
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span>{" "}
                    {selectedTransaction.location}
                  </p>
                  <p>
                    <span className="font-semibold">Size:</span>{" "}
                    {selectedTransaction.landSize}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Documents
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-blue-600">
                    <li>
                      <a
                        href={selectedTransaction.documentUrl1}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center"
                      >
                        <AiOutlineDownload className="mr-2" />
                        Document 1
                      </a>
                    </li>
                    <li>
                      <a
                        href={selectedTransaction.documentUrl2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center"
                      >
                        <AiOutlineDownload className="mr-2" />
                        Document 2
                      </a>
                    </li>
                    <li>
                      <a
                        href={selectedTransaction.documentUrl3}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center"
                      >
                        <AiOutlineDownload className="mr-2" />
                        Document 3
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Buy Modal */}
        {buyModalOpen && selectedTransaction && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4 sm:p-6 overflow-y-auto">
            <div className="relative bg-white p-6 rounded-xl shadow-2xl w-full max-w-3xl max-h-[95vh] min-w-[60vw] overflow-y-auto">
              <h2 className="font-semibold text-xl text-gray-800 mb-6">
                Confirm Land Purchase
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Section */}
                <div>
                  <img
                    src={require("../../assets/images/land.jpg")}
                    alt="Land"
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <p>
                    <strong>Land ID:</strong> {selectedTransaction.id}
                  </p>
                  <div className="flex justify-between mb-4">
                    <div>
                      <p>
                        <strong>Owner:</strong> {selectedTransaction.owner}
                      </p>
                      <p>
                        <strong>Location:</strong>{" "}
                        {selectedTransaction.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p>
                        <strong>Size:</strong> {selectedTransaction.landSize}
                      </p>
                      <p>
                        <strong>Thram No:</strong> {selectedTransaction.thramNo}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div>
                  {/* Bank Dropdown */}
                  <div className="mb-4">
                    <label
                      htmlFor="bank-select"
                      className="block mb-2 font-semibold text-gray-700"
                    >
                      Select Bank
                    </label>
                    <select
                      id="bank-select"
                      className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                    >
                      <option value="" disabled>
                        -- Select Bank --
                      </option>
                      <option value="BOB Bank">BOB Bank</option>
                      <option value="Tashi Bank">Tashi Bank</option>
                      <option value="BNBL">BNBL</option>
                      <option value="BDBL">BDBL</option>
                      <option value="Druk PNB">Druk PNB</option>
                      <option value="DK">DK</option>
                    </select>
                  </div>

                  {/* Image Upload */}
                  <div className="mb-4">
                    <label
                      htmlFor="image-upload"
                      className="block mb-2 font-semibold text-gray-700"
                    >
                      Upload Image
                    </label>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      className="block w-full text-gray-700 rounded-md border border-gray-300 px-2 py-1.5 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      onChange={handleImageChange}
                    />
                    {uploadedImage && (
                      <img
                        src={uploadedImage}
                        alt="Uploaded preview"
                        className="mt-2 w-full h-24 object-contain rounded-lg border border-gray-300 shadow-sm"
                      />
                    )}
                  </div>

                  {/* Journal Number */}
                  <div>
                    <label
                      htmlFor="journal-number"
                      className="block mb-2 font-semibold text-gray-700"
                    >
                      Journal Number
                    </label>
                    <input
                      type="text"
                      id="journal-number"
                      value={journalNumber}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow only digits
                        if (/^\d*$/.test(value)) {
                          setJournalNumber(value);
                        }
                      }}
                      placeholder="Enter journal number (numbers only)"
                      className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Purchase Success Popup */}
              {purchaseSuccess && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
                  role="alert"
                  aria-live="assertive"
                  aria-modal="true"
                >
                  <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 flex flex-col items-center space-y-6 relative animate-fadeIn">
                    <svg
                      className="h-16 w-16 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <h3 className="text-3xl font-semibold text-gray-900">
                      Purchase Successful!
                    </h3>
                    <p className="text-gray-600 text-center max-w-xs">
                      Your purchase has been completed successfully. Thank you
                      for your business!
                    </p>
                    <button
                      onClick={closePurchaseSuccess}
                      aria-label="Close success message"
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  onClick={handlePurchase}
                  className={`px-4 py-2 rounded transition text-white ${
                    isFormValid
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-green-300 cursor-not-allowed"
                  }`}
                  disabled={!isFormValid}
                >
                  Confirm Purchase
                </button>
                <button
                  onClick={closeBuyModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* land image card */}

        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={require("../../assets/images/land.jpg")}
                  alt="Land"
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-lg"
                  loading="lazy"
                />

                <div className="flex flex-col flex-1 p-4">
                  <h3 className="text-lg font-semibold mb-3 truncate">
                    Land ID: {transaction.id}
                  </h3>

                  <div className="flex flex-col sm:flex-row justify-between text-gray-600 text-sm gap-4 mb-4">
                    <div>
                      <p>
                        <strong>Owner:</strong>{" "}
                        {transaction.owner || transaction.ownerName || "N/A"}
                      </p>
                      <p>
                        <strong>Location:</strong>{" "}
                        {transaction.location || "N/A"}
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <p>
                        <strong>Size:</strong> {transaction.landSize || "N/A"}
                      </p>
                      <p>
                        <strong>Thram No:</strong>{" "}
                        {transaction.thramCopy || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => openViewModal(transaction)}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-2.5 py-1 text-sm transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => openBuyModal(transaction)}
                      className="bg-green-600 hover:bg-green-700 text-white rounded-md px-2.5 py-1 text-sm transition"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyLand;
