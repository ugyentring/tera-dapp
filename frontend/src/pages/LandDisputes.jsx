import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGavel, FaBalanceScale, FaClock } from "react-icons/fa";
import {
  FiSearch,
  FiLogOut,
  FiUser,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import {
  MdDashboard,
  MdOutlineHome,
  MdOutlineGavel,
  MdOutlineTransferWithinAStation,
} from "react-icons/md";
import logo from "../assets/images/logo.png";

const LandDisputes = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSidebarItem, setActiveSidebarItem] = useState(4); // Land Disputes is active by default
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [showSidebarText, setShowSidebarText] = useState(
    window.innerWidth >= 1024
  );
  const itemsPerPage = 5;

  const allDisputes = Array.from({ length: 30 }, (_, index) => ({
    id: `DP-${index + 1}`,
    parties: `Party A vs Party B ${index + 1}`,
    status:
      index % 3 === 0 ? "Resolved" : index % 3 === 1 ? "Pending" : "Ongoing",
    date: `Feb ${index + 1}, 2025`,
  }));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDisputes = allDisputes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allDisputes.length / itemsPerPage);

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

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
      setShowSidebarText(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSidebarItemClick = (pageNumber) => {
    setActiveSidebarItem(pageNumber);
    setCurrentPage(1);
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

  return (
    <div className="min-h-screen bg-gray-100 flex row ">
      <div className="flex-grow p-4 sm:p-8 pt-16 col-12">
        <div className="sticky top-0 bg-white z-20 shadow-md h-16 flex justify-between items-center p-4 sm:hidden">
          <button onClick={toggleSidebarMobile} className="mr-2">
            <FiMenu className="text-2xl text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Land Disputes</h1>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <FiUser
                className="text-2xl cursor-pointer ml-2"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-48 origin-top-right">
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

        {/* Header for Desktop */}
        <div className="rounded-lg hidden sm:flex justify-between items-center mb-6 sticky top-0 bg-white z-10 shadow-md p-4">
          <div className="flex items-center ">
            <button onClick={toggleSidebarMobile} className="lg:hidden mr-4">
              <FiMenu className="text-2xl text-gray-700" />
            </button>
            <h2 className=" col-span-full text-xl font-semibold text-gray-800 ">
              Land Disputes
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-yellow-50 hover:bg-yellow-100 text-yellow-800 p-5 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">
                Ongoing Disputes
              </p>
              <p className="text-3xl font-bold mt-1">9</p>
            </div>
            <div className="bg-yellow-200 rounded-full p-3">
              <FaGavel className="text-yellow-700 text-2xl animate-hammer-slow origin-top-right" />
            </div>
          </div>

          <div className="bg-green-50 hover:bg-green-100 text-green-800 p-5 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                Resolved Cases
              </p>
              <p className="text-3xl font-bold mt-1">10</p>
            </div>
            <div className="bg-green-200 rounded-full p-3">
              <FaBalanceScale className="text-green-700 text-2xl animate-weighing" />
            </div>
          </div>

          <div className="bg-red-50 hover:bg-red-100 text-red-800 p-5 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                Pending Cases
              </p>
              <p className="text-3xl font-bold mt-1">2</p>
            </div>
            <div className="bg-red-200 rounded-full p-3">
              <FaClock className="text-red-700 text-2xl animate-clock-hands" />
            </div>
          </div>
        </div>

        {/* Disputes Table */}
        <div className="bg-white shadow-xl rounded-lg p-6 overflow-x-auto">
          <div className="flex justify-between items-center w-full mb-6">
            <h2 className="font-semibold text-xl">Dispute Records</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="peer px-3 py-2 border rounded-lg pl-8 w-full sm:w-64 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#003366]"
              />
              <FiSearch className="absolute left-2 top-2.5 text-gray-500 peer-focus:left-2.5 transition-all duration-300" />
            </div>
          </div>

          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
                <th className="py-3 px-4 text-left border-b border-gray-200">
                  Case ID
                </th>
                <th className="py-3 px-4 text-left border-b border-gray-200">
                  Land ID
                </th>
                <th className="py-3 px-4 text-left border-b border-gray-200">
                  Filed By
                </th>
                <th className="py-3 px-4 text-left border-b border-gray-200">
                  Dispute Type
                </th>
                <th className="py-3 px-4 text-center border-b border-gray-200">
                  Status
                </th>
                <th className="py-3 px-4 text-left border-b border-gray-200">
                  Filed Date
                </th>
                <th className="py-3 px-4 text-center border-b border-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentDisputes.map((dispute, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {" "}
                  {/* Added row hover */}
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">
                    {dispute.id}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">
                    LD-{index + 101}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">
                    User {index + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">
                    {
                      ["Boundary Issue", "Ownership Conflict", "Inheritance"][
                        index % 3
                      ]
                    }
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center">
                    <span
                      className={`font-semibold
                    ${
                      dispute.status.toLowerCase() === "resolved"
                        ? "text-green-600"
                        : dispute.status.toLowerCase() === "pending"
                        ? "text-yellow-500"
                        : dispute.status.toLowerCase() === "rejected"
                        ? "text-red-600"
                        : "text-gray-500" // Default color
                    }`}
                    >
                      {dispute.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">
                    {dispute.date}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center">
                    <div className="flex justify-center">
                      <button className="bg-[#003366] hover:bg-[#002952] text-white font-bold py-1 px-2 rounded text-xs focus:outline-none focus:shadow-outline transition-colors duration-200">
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-5">
            <span className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, allDisputes.length)} of{" "}
              {allDisputes.length} entries
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-200 text-gray-700 px-4 py-1 rounded-md hover:bg-gray-300 focus:outline-none  disabled:opacity-50 transition-colors duration-150"
              >
                Prev
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-[#142854] text-white px-4 py-1 rounded-md hover:bg-[#0f1d2d] focus:outline-none  disabled:opacity-50 transition-colors duration-150"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandDisputes;
