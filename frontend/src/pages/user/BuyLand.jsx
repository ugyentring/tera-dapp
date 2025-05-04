import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import { MdLocationCity } from 'react-icons/md';
import { AiOutlineDownload } from "react-icons/ai"; // For download icon
import { AiOutlineEye } from 'react-icons/ai';
import React from 'react';

function BuyLand() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
    const [showSidebarText, setShowSidebarText] = useState(window.innerWidth >= 1024);
    const [activeSidebarItem, setActiveSidebarItem] = useState(1);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const itemsPerPage = 6; // Adjusted to potentially fit 3 cards better

    const allTransactions = Array.from({ length: 100 }, (_, index) => ({
        id: `TXN-${index + 1}`,
        owner: `Owner ${index + 1}`,
        land: `LP-${index + 1}`,
        date: `Jan ${index + 1}, 2025`,
        type: index % 3 === 0 ? "Buy" : index % 3 === 1 ? "Sell" : "Inheritance", // Randomly assign transaction type
        buyerInfo: { name: `Buyer ${index + 1}`, email: `buyer${index + 1}@example.com` },
        sellerInfo: { name: `Seller ${index + 1}`, email: `seller${index + 1}@example.com` },
        landInfo: { location: `Location ${index + 1}`, size: `${(index + 1) * 10} sq.m` },
        documentUrl: "asdf",
        thramNo: "2A-234",
        imageUrl: `https://via.placeholder.com/300/${Math.floor(Math.random() * 16777215).toString(16)}/FFFFFF?Text=Land+Image`, // Placeholder image URL
    }));
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTransactions = allTransactions.slice(indexOfFirstItem, indexOfLastItem);
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


    const handleSidebarItemClick = (pageNumber) => {
        setActiveSidebarItem(pageNumber);
        navigate(pageNumber === 1 ? "/dashboard" : pageNumber === 2 ? "/transactions" : pageNumber === 3 ? "/land-records" : "/land-disputes");
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

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
                {viewModalOpen && selectedTransaction && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4 sm:p-6 overflow-y-auto">
                        <div className="relative bg-white p-4 sm:p-6 rounded-xl shadow-2xl w-full max-w-4xl sm:w-11/12 md:w-10/12 lg:w-2/3 xl:w-1/2 max-h-[95vh] min-w-[60vw] overflow-y-auto">

                            {/* Red Cross Close Button at top-right corner */}
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
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <h2 className="font-semibold text-xl text-gray-800 mb-4">Transaction Details</h2>
                            {selectedTransaction && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p><span className="font-semibold">Transaction ID:</span> {selectedTransaction.id}</p>
                                        <p><span className="font-semibold">Type:</span> {selectedTransaction.type}</p>
                                        <p><span className="font-semibold">Date:</span> {selectedTransaction.date}</p>

                                    </div>
                                    <div>
                                        <p className="font-semibold mb-2">Owner Information:</p>
                                        <p><span className="font-semibold ml-2">Name:</span> {selectedTransaction.owner}</p>
                                    </div>
                                    {selectedTransaction.buyerInfo && (
                                        <div>
                                            <p className="font-semibold mb-2">Buyer Information:</p>
                                            <p><span className="font-semibold ml-2">Name:</span> {selectedTransaction.buyerInfo.name}</p>
                                            <p><span className="font-semibold ml-2">Email:</span> {selectedTransaction.buyerInfo.email}</p>
                                        </div>
                                    )}
                                    {selectedTransaction.sellerInfo && (
                                        <div>
                                            <p className="font-semibold mb-2">Seller Information:</p>
                                            <p><span className="font-semibold ml-2">Name:</span> {selectedTransaction.sellerInfo.name}</p>
                                            <p><span className="font-semibold ml-2">Email:</span> {selectedTransaction.sellerInfo.email}</p>
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-semibold mb-2">Land Information:</p>
                                        <p><span className="font-semibold ml-2">Land ID:</span> {selectedTransaction.land}</p>
                                        <p><span className="font-semibold ml-2">Location:</span> {selectedTransaction.landInfo.location}</p>
                                        <p><span className="font-semibold ml-2">Size:</span> {selectedTransaction.landInfo.size}</p>
                                    </div>
                                    {selectedTransaction.documentUrl && (
                                        <div>
                                            <p className="font-semibold mb-2">Document:</p>
                                            <a href={selectedTransaction.documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                                                <AiOutlineDownload className="mr-2" /> View Document
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {/* Header for Desktop */}
                <div className="rounded-lg hidden sm:flex justify-between items-center mb-6 top-0 bg-white z-10 shadow-md p-4">
                    <div className="flex items-center gap-4 ">
                        <h1 className="font-semibold text-gray-800 ml-5">Buy Land</h1>
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
                <div className="relative flex justify-end">
                    <FiSearch className="relative left-6 top-2.5 text-gray-500 peer-focus:left-2.5 transition-all duration-300" />

                    <input
                        type="text"
                        placeholder="Search"
                        className="peer px-3 py-2 border-[#142854] border rounded-lg pl-8 w-full sm:w-64 text-sm transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#142854] bg-transparent  right-0"
                    />
                </div>


                <div className="bg-gray-100 mt-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4">
                        {currentTransactions.map((txn) => (
                            <div key={txn.id} className="bg-white p-3 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col">
                                <div className="relative w-full h-60"> {/* Increased height from h-40 to h-60 */}
                                    <img
                                        src={require('../../assets/images/land.jpg')}
                                        alt={`Land ${txn.id}`}
                                        className="absolute inset-0 w-full rounded border-2 h-full object-cover border-[#142854]"
                                    />
                                </div>

                                <div className="p-3 flex-grow flex flex-col justify-between">
                                    <h3 className="font-semibold text-lg text-gray-800 mb-1 truncate">{txn.landInfo.location}</h3>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-2">
                                        <div className="flex items-center space-x-1">
                                            <FiUser className="text-gray-500 text-sm" />
                                            <span className="text-gray-700 text-xs truncate">{txn.owner}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <MdLocationCity className="text-gray-500 text-sm" />
                                            <span className="text-gray-700 text-xs truncate">{txn.land}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <AiOutlineEye className="text-gray-500 text-sm" />
                                            <span className="text-gray-700 text-xs truncate">Size: {txn.landInfo.size}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <AiOutlineEye className="text-gray-500 text-sm" />
                                            <span className="text-gray-700 text-xs truncate">Thram: {txn.landInfo.thramNo}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <div></div>
                                        <button
                                            className="bg-[#003366] hover:bg-[#002952] px-4 rounded-full text-white font-semibold py-1 px-2 text-xs focus:outline-none focus:shadow-outline transition-colors duration-200"
                                            onClick={() => openViewModal(txn)}
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-end space-x-5 mt-5">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`py-2 px-6 rounded text-sm font-medium transition-all 
                                            ${currentPage === 1
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'}`}
                            >
                                Previous
                            </button>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`py-2 px-6 rounded text-sm font-medium transition-all
                                         ${currentPage === totalPages
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-[#142854] text-white hover:bg-[#0f1e40]'}`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BuyLand;