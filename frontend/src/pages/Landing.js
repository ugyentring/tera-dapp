import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../assets/images/logo.png";
import heroBanner from "../assets/images/herobanner.jpeg";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Check if scrolled more than 50px
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Navigate to Login page when Sign In button is clicked
  const handleSignInClick = () => {
    navigate("/login");
  };

  // Navigate to Register page when Sign Up button is clicked
  const handleSignUpClick = () => {
    navigate("/register");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md h-20" : "bg-transparent h-24"
          }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <img src={logo} alt="Logo" className="h-10 md:h-12 lg:h-16" />

          {/* Mobile Menu Button (Hamburger) */}
          <button
            className="md:hidden flex flex-col justify-center items-center space-y-2 w-8 h-8 bg-transparent border-none p-0 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`block w-6 h-1 bg-[rgb(14,12,85)] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
            ></span>
            <span
              className={`block w-6 h-1 bg-[rgb(14,12,85)] transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                }`}
            ></span>
            <span
              className={`block w-6 h-1 bg-[rgb(14,12,85)] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
            ></span>
          </button>
          {/* Desktop Navigation Menu */}
          <nav
            className={`hidden md:flex space-x-6 md:static absolute top-full left-0 transition-all duration-300 ${menuOpen ? "hidden" : "block"
              }`}
          >
            <a
              href="#"
              className={`${scrolled ? "text-[rgb(14,12,85)]" : "text-white"
                } hover:text-[rgb(14,12,85)] font-medium py-2 px-4 block md:inline transition-colors duration-300`}
            >
              Home
            </a>
            <a
              href="#"
              className={`${scrolled ? "text-[rgb(14,12,85)]" : "text-white"
                } hover:text-[rgb(14,12,85)] font-medium py-2 px-4 block md:inline transition-colors duration-300`}
            >
              About Us
            </a>
            <a
              href="#"
              className={`${scrolled ? "text-[rgb(14,12,85)]" : "text-white"
                } hover:text-[rgb(14,12,85)] font-medium py-2 px-4 block md:inline transition-colors duration-300`}
            >
              Contact Us
            </a>
            <a
              href="#"
              className={`${scrolled ? "text-[rgb(14,12,85)]" : "text-white"
                } hover:text-[rgb(14,12,85)] font-medium py-2 px-4 block md:inline transition-colors duration-300`}
            >
              FAQs
            </a>
          </nav>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="px-6 py-2 border-[rgb(14,12,85)] text-[rgb(14,12,85)] rounded-lg border-2 transition-colors duration-300 bg-transparent hover:bg-[rgb(14,12,85)] hover:text-white"
              onClick={handleSignInClick}
            >
              Log In
            </button>
            <button
              className="px-6 py-2 bg-[rgb(14,12,85)] text-white rounded-lg border-2 border-[rgb(14,12,85)] transition-all duration-300 hover:scale-105"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Version: Hamburger Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-40">
          <div className="absolute top-16 left-0 w-full bg-white p-4">
            <div className="flex flex-col space-y-4">
              <a
                href="#"
                className="text-[rgb(14,12,85)] hover:bg-gray-100 py-2 px-4 transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#"
                className="text-[rgb(14,12,85)] hover:bg-gray-100 py-2 px-4 transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                About Us
              </a>
              <a
                href="#"
                className="text-[rgb(14,12,85)] hover:bg-gray-100 py-2 px-4 transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Contact Us
              </a>
              <a
                href="#"
                className="text-[rgb(14,12,85)] hover:bg-gray-100 py-2 px-4 transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                FAQs
              </a>

              {/* Sign In and Sign Up Buttons */}
              <div className="mt-6 flex flex-col space-y-4">
                <button
                  className="px-6 py-2 border-[rgb(14,12,85)] text-[rgb(14,12,85)] rounded-lg hover:bg-gray-100 border-2 transition-colors duration-300"
                  onClick={handleSignInClick} // Add the onClick handler here
                >
                  Log In
                </button>
                <button
                  className="px-6 py-2 bg-[rgb(14,12,85)] text-white rounded-lg hover:bg-[rgb(10, 9, 60)] transition-colors duration-300"
                  onClick={handleSignUpClick} // Add the onClick handler here
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        className="relative h-[500px] sm:h-[60vh] lg:h-[70vh] bg-cover bg-center text-white flex items-center justify-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold">Secure & Transparent Land Registry System</h2>
          <p className="mt-2 text-lg sm:text-xl">
            A blockchain-powered system for land transactions and verification
          </p>
          <div className="mt-6 space-x-3 flex justify-center">
            <button className="px-6 py-3 border-[rgb(14,12,85)] text-white rounded-lg border-2 transition-colors duration-300 bg-transparent hover:bg-[rgb(14,12,85)] hover:text-white">
              Buy/Sell Land
            </button>
            <button className="px-6 py-3 bg-[rgb(14,12,85)] text-white rounded-lg transition-all duration-300 hover:bg-[rgb(10, 9, 60)] hover:scale-105 hover:shadow-lg">
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Key Features</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          <div className="transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
            <FeatureCard
              title="Secure Transaction"
              description="Immutable land records stored on blockchain ensuring maximum security"
              icon="🔒"
            />
          </div>
          <div className="transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
            <FeatureCard
              title="Transparent Ownership"
              description="Real-time access to complete land history and ownership details"
              icon="👥"
            />
          </div>
          <div className="transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
            <FeatureCard
              title="Quick Processing"
              description="Reduced paperwork & automated approvals for faster transactions"
              icon="⚡"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Secure Land Registry. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <div className="text-5xl">{icon}</div>
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}
