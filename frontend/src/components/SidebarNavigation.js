import { FiChevronLeft, FiChevronRight, FiLogOut } from "react-icons/fi";
import {
  MdDashboard,
  MdOutlineTransferWithinAStation,
  MdOutlineHome,
  MdOutlineGavel,
  MdShoppingCart,
  MdAttachMoney,
  MdCompareArrows,
  MdGavel,
} from "react-icons/md";
import logo from "../assets/images/logo.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [showSidebarText, setShowSidebarText] = useState(
    window.innerWidth >= 1024
  );
  const [activeSidebarItem, setActiveSidebarItem] = useState(1);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const itemsPerPage = 5;
  const [userEmail, setUserEmail] = useState(null);

  const allTransactions = Array.from({ length: 100 }, (_, index) => ({
    id: `TXN-${index + 1}`,
    owner: `Owner ${index + 1}`,
    land: `LP-${index + 1}`,
    date: `Jan ${index + 1}, 2025`,
    status:
      index % 3 === 0 ? "Rejected" : index % 3 === 1 ? "Pending" : "Approved", // Randomly assign status
    type: index % 3 === 0 ? "Buy" : index % 3 === 1 ? "Sell" : "Inheritance", // Randomly assign transaction type
    buyerInfo: {
      name: `Buyer ${index + 1}`,
      email: `buyer${index + 1}@example.com`,
    },
    sellerInfo: {
      name: `Seller ${index + 1}`,
      email: `seller${index + 1}@example.com`,
    },
    landInfo: {
      location: `Location ${index + 1}`,
      size: `${(index + 1) * 10} sq.m`,
    },
    documentUrl: "asdf", // Sample document URL for download
  }));
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
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleSidebarItemClick = (pageNumber, path) => {
    setActiveSidebarItem(pageNumber);
    navigate(path);
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

  useEffect(() => {
    // Retrieve user information from local storage or wherever you store it after login
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserEmail(parsedUser.email);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);
  useEffect(() => {
    if (userEmail) {
      if (userEmail === "bhutantera@gvt.bt") {
        setActiveSidebarItem(1); // Government: Dashboard
      } else {
        setActiveSidebarItem(6); // Non-Government: User Dashboard
      }
    }
  }, [userEmail]);

  const isGovernmentUser = userEmail === "bhutantera@gvt.bt";

  return (
    <div
      className={`bg-gradient-to-b from-[#67492b] to-[#f3bd85] text-white sticky top-0 h-screen flex flex-col transition-all duration-300 overflow-hidden ${
        sidebarOpen ? "w-64" : "w-20"
      } items-center lg:flex`}
    >
      <div
        className={`mb-8 pt-4 flex justify-center ${
          sidebarOpen ? "w-full" : "w-20"
        }`}
      >
        <img
          src={logo}
          alt="TeraLogo"
          className={`h-16 w-auto transition-all duration-300 ${
            sidebarOpen ? "block" : "hidden"
          }`}
        />
        {!sidebarOpen && (
          <img src={logo} alt="TeraLogo Small" className="h-10 w-auto" />
        )}
      </div>

      <button
        onClick={toggleSidebarDesktop}
        className="hidden lg:flex items-center justify-center p-2 rounded-full bg-white text-gray-700 absolute top-4 right-[-10px] shadow-md cursor-pointer"
      >
        {sidebarOpen ? (
          <FiChevronLeft className="text-xl" />
        ) : (
          <FiChevronRight className="text-xl" />
        )}
      </button>

      <ul className="space-y-2 w-full flex flex-col items-center justify-start mt-4">
        {isGovernmentUser && (
          <SidebarItem
            icon={<MdDashboard className="text-xl" />}
            label="Dashboard"
            active={activeSidebarItem === 1}
            onClick={() => handleSidebarItemClick(1, "/dashboard")}
            showText={showSidebarText}
          />
        )}
        {isGovernmentUser && (
          <SidebarItem
            icon={<MdOutlineHome className="text-xl" />}
            label="Land Records"
            active={activeSidebarItem === 2}
            onClick={() => handleSidebarItemClick(2, "/land-records")}
            showText={showSidebarText}
          />
        )}
        {isGovernmentUser && (
          <SidebarItem
            icon={<MdOutlineTransferWithinAStation className="text-xl" />}
            label="Transactions"
            active={activeSidebarItem === 3}
            onClick={() => handleSidebarItemClick(3, "/transactions")}
            showText={showSidebarText}
          />
        )}
        {isGovernmentUser && (
          <SidebarItem
            icon={<MdOutlineGavel className="text-xl" />}
            label="Land Disputes"
            active={activeSidebarItem === 4}
            onClick={() => handleSidebarItemClick(4, "/land-disputes")}
            showText={showSidebarText}
          />
        )}
        {isGovernmentUser && (
          <SidebarItem
            icon={<MdOutlineGavel className="text-xl" />}
            label="Verify Ownership"
            active={activeSidebarItem === 5}
            onClick={() => handleSidebarItemClick(5, "/verify-ownership")}
            showText={showSidebarText}
          />
        )}
        {!isGovernmentUser && (
          <SidebarItem
            icon={<MdDashboard className="text-xl" />}
            label="Dashboard"
            active={activeSidebarItem === 6}
            onClick={() => handleSidebarItemClick(6, "/dashboard")}
            showText={showSidebarText}
          />
        )}
        {!isGovernmentUser && (
          <SidebarItem
            icon={<MdShoppingCart className="text-xl" />}
            label="Buy Land"
            active={activeSidebarItem === 7}
            onClick={() => handleSidebarItemClick(7, "/buy-land")}
            showText={showSidebarText}
          />
        )}
        {!isGovernmentUser && (
          <SidebarItem
            icon={<MdAttachMoney className="text-xl" />}
            label="Sell Land"
            active={activeSidebarItem === 8}
            onClick={() => handleSidebarItemClick(8, "/sell-land")}
            showText={showSidebarText}
          />
        )}
        {!isGovernmentUser && (
          <SidebarItem
            icon={<MdCompareArrows className="text-xl" />}
            label="Transfer Ownership"
            active={activeSidebarItem === 9}
            onClick={() => handleSidebarItemClick(9, "/transfer-ownership")}
            showText={showSidebarText}
          />
        )}
        {!isGovernmentUser && (
          <SidebarItem
            icon={<MdGavel className="text-xl" />}
            label="Dispute Land"
            active={activeSidebarItem === 10}
            onClick={() => handleSidebarItemClick(10, "/dispute-land")}
            showText={showSidebarText}
          />
        )}
      </ul>
      <button
        className={`flex items-center gap-4 text-white-500 p-3 rounded-full  mt-auto w-full justify-center lg:justify-start pl-4 lg:pl-6 transition-all duration-300 ${
          sidebarOpen ? "block" : "hidden lg:block"
        }`}
        onClick={handleLogout}
      >
        <FiLogOut className="text-xl" />
        <span className={`text-sm ${showSidebarText ? "block" : "hidden"}`}>
          Logout
        </span>
      </button>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick, showText }) => (
  <li
    onClick={onClick}
    className={`flex items-center gap-4 p-3 pl-4 lg:pl-6 rounded-tl-full rounded-bl-full cursor-pointer w-full ${
      active ? "bg-white text-[#003366]" : "hover:bg-[#1e3a8a]"
    }`}
  >
    {icon}
    <span
      className={`text-sm transition-all duration-300 ${
        showText ? "block" : "hidden"
      }`}
    >
      {label}
    </span>
  </li>
);

export default Sidebar;
