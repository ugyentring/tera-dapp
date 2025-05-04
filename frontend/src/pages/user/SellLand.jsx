import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiSearch, FiLogOut, FiUser, FiMenu, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import logo from "../../assets/images/logo.png";
import landImage from "../../assets/images/land.jpg";
import { MdLocationCity, MdCheckCircleOutline, MdGavel, MdHourglassEmpty } from 'react-icons/md';
import { AiOutlineDownload } from "react-icons/ai"; // For download icon
import { AiOutlineEye } from 'react-icons/ai';
import React from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import swal from 'sweetalert2';

function SellLand() {
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
        status: index % 3 === 0 ? "Rejected" : index % 3 === 1 ? "Pending" : "Approved", // Randomly assign status
        type: index % 3 === 0 ? "Buy" : index % 3 === 1 ? "Sell" : "Inheritance", // Randomly assign transaction type
        buyerInfo: { name: `Buyer ${index + 1}`, email: `buyer${index + 1}@example.com` },
        sellerInfo: { name: `Seller ${index + 1}`, email: `seller${index + 1}@example.com` },
        landInfo: { location: `Location ${index + 1}`, size: `${(index + 1) * 10} sq.m` },
        documentUrl: "asdf",
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
    const handleSubmit = () => {
        new swal({
            title: "Success!",
            text: "Details submitted successfully.",
            icon: "success",
            button: "OK",
            confirmButtonColor: '#142854'
        });
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

                {/* Header for Desktop */}
                <div className="rounded-lg hidden sm:flex justify-between items-center mb-6 sticky top-0 bg-white z-10 shadow-md p-4">
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
                <div className="bg-gray-50 p-6 sm:p-10">
                    <h2 className="text-center text-3xl font-semibold text-gray-900 mb-8">List Land for Sale</h2>

                    {/* Land Details */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-5">Land Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <input
                                type="text"
                                placeholder="Plot ID"
                                className="input-field border-2 border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#142854] text-sm transition-all duration-300"
                                aria-label="Plot ID"
                            />
                            <input
                                type="text"
                                placeholder="Size (Acres)"
                                className="input-field border-2 border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#142854] text-sm transition-all duration-300"
                                aria-label="Size in Acres"
                            />
                            <input
                                type="text"
                                placeholder="Dzongkhag"
                                className="input-field border-2 border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#142854] text-sm transition-all duration-300"
                                aria-label="Dzongkhag"
                            />
                            <input
                                type="text"
                                placeholder="Gewog"
                                className="input-field border-2 border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#142854] text-sm transition-all duration-300"
                                aria-label="Gewog"
                            />
                            <input
                                type="text"
                                placeholder="Village"
                                className="input-field border-2 border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#142854] text-sm transition-all duration-300"
                                aria-label="Village"
                            />
                            <input
                                type="text"
                                placeholder="Ownership Status"
                                className="input-field border-2 border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#142854] text-sm transition-all duration-300"
                                aria-label="Ownership Status"
                            />
                        </div>
                        <div className="mt-6">
                            <button className="bg-[#142854] hover:bg-[#142854]/80 text-white px-5 py-2 rounded-md text-sm flex items-center space-x-2 transition-all duration-300 ease-in-out shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#142854]">
                                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.14-3.225 4.5 4.5 0 01-3.225-1.14M19.5 19.5a4.5 4.5 0 01-1.14-3.225 4.5 4.5 0 01-3.225-1.14M12 2.25c-5.23 0-9.75 4.691-9.75 10.5S6.77 23.25 12 23.25 21.75 18.559 21.75 12.75 17.23 2.25 12 2.25z" />
                                </svg>
                                </span>
                                <span>Upload Images</span>
                            </button>
                        </div>
                    </div>

                    {/* Sale Details */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-5">Sale Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <input
                                type="text"
                                placeholder="Price (Nu)"
                                className="input-field border-2 border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#142854] text-sm transition-all duration-300"
                                aria-label="Price"
                            />
                            <input
                                type="text"
                                placeholder="Sale Type"
                                className="input-field border-2 border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#142854] text-sm transition-all duration-300"
                                aria-label="Sale Type"
                            />
                            <input
                                type="text"
                                placeholder="Availability"
                                className="input-field border-2 border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#142854] text-sm transition-all duration-300"
                                aria-label="Availability"
                            />
                        </div>
                        <textarea
                            placeholder="Land Description"
                            rows="4"
                            className="mt-6 w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#142854] text-sm transition-all duration-300"
                            aria-label="Land Description"
                        />
                    </div>

                    {/* Contact */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-5">Contact Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <input
                                type="text"
                                placeholder="Seller Name"
                                className="input-field border-2 border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#142854] text-sm transition-all duration-300"
                                aria-label="Seller Name"
                            />
                            <input
                                type="text"
                                placeholder="Contact Number"
                                className="input-field border-2 border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#142854] text-sm transition-all duration-300"
                                aria-label="Contact Number"
                            />
                        </div>

                        <div className="mt-4">
                            <button className="bg-[#142854] hover:bg-[#0f1f38] text-white px-3 py-2 rounded-md text-xs flex items-center space-x-2 transition-all duration-300 ease-in-out shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#142854]">
                                <FaCloudUploadAlt className="text-white h-4 w-4" />
                                <span>Upload Land Ownership Document</span>
                            </button>
                        </div>
                    </div>


                    {/* Checkbox for Confirmation */}
                    <div className="mb-6">
                        <label className="inline-flex items-start space-x-2">
                            <input
                                type="checkbox"
                                className="h-4 w-4 accent-[#142854] border-gray-300 rounded focus:ring-[#142854] transition-all duration-300"
                                aria-label="Confirm details"
                            />
                            <span className="text-sm text-gray-700">
                                I confirm that the provided details are accurate and I am authorized to sell this land.
                            </span>
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3 mt-3">
                        <button className="bg-[#FF0000] hover:bg-[#cc0000] text-white px-3 py-1.5 rounded text-xs font-medium transition duration-200">
                            Cancel
                        </button>

                        <button
                            className="bg-[#142854] hover:bg-[#0f1f38] text-white px-3 py-1.5 rounded text-xs font-medium transition duration-200"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellLand;