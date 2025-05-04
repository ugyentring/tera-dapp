import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import heroImage from "../assets/images/landingpage.jpg";
import aboutUs from "../assets/images/aboutuss.jpg";
import contactUs from "../assets/images/contactus.jpg";
import FAQImage from "../assets/images/faq.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

const LandingPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { name, email, message };

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Message sent successfully!");
        setName(""); // Clear the form
        setEmail("");
        setMessage("");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message");
    }
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Navigation Bar Over Hero Image */}
      <div
        className="relative"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "70vh",
          minHeight: "500px",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Navigation content */}
        <div className="relative z-10">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center">
            <a href="#home">
              <img src={logo} alt="Land Registry Logo" className="h-16" />
            </a>

            <div className="ml-auto flex items-center space-x-8">
              <a
                href="#home"
                className="text-white hover:text-blue-400 transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-white hover:text-blue-400 transition-colors"
              >
                About Us
              </a>
              <a
                href="#contactus"
                className="text-white hover:text-blue-400 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="#faq"
                className="text-white hover:text-blue-400 transition-colors"
              >
                FAQs
              </a>

              <div className="flex items-center space-x-4 ml-8">
                <Link
                  to="/login"
                  className="text-white font-medium hover:text-blue-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </nav>

          {/* Hero content */}
          <div
            id="home"
            className="max-w-7xl mx-auto px-6 h-[calc(70vh-68px)] flex flex-col justify-center"
          >
            <div className="text-white max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Secure & Transparent Land Registry System
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                A blockchain-powered system for land transactions and
                verification
              </p>
              <div className="flex gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  Buy/Sell Land
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:bg-opacity-10 font-medium py-3 px-6 rounded-lg transition-colors">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section with White Background */}
      <div id="about" className="bg-white py-16 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <FontAwesomeIcon icon={faShield} />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Secure Transaction
              </h3>
              <p className="text-gray-600">
                Immutable land records stored on blockchain ensuring maximum
                security
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <FontAwesomeIcon icon={faUsers} />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Transparent Ownership
              </h3>
              <p className="text-gray-600">
                Real-time access to complete land history and ownership details
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <FontAwesomeIcon icon={faBolt} />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Quick Processing
              </h3>
              <p className="text-gray-600">
                Reduced paperwork & automated approvals for faster transactions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section with Background Image */}
      <div
        id="about"
        className="relative h-[90vh] min-h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutUs})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* "About Us" title */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            About Us
          </h2>
        </div>

        {/* Centered glassmorphism content */}
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-12 max-w-4xl text-white space-y-8 leading-relaxed">
            <p className="text-xl md:text-2xl">
              Welcome to{" "}
              <strong className="font-semibold">
                TERA (Transparent Estate Registry & Authentication)
              </strong>{" "}
              – a blockchain-based land registry system designed for GMC to
              modernize how land ownership and transactions are recorded,
              verified, and managed.
            </p>
            <p className="text-xl md:text-2xl">
              At <strong className="font-semibold">TERA</strong>, we value{" "}
              <strong className="font-semibold">
                transparency, security, and efficiency
              </strong>
              . Traditional systems face inefficiencies, fraud risks, and slow
              verification. Blockchain gives a tamper-proof, decentralized, and
              secure solution for estate registration and authentication.
            </p>
          </div>
        </div>
      </div>

      {/* contact us part from here ===========================================================================================*/}

      <div id="contactus" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Contact Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left side - Contact Info with Image */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Get in touch</h3>
              <div className="space-y-4">
                <p className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  teragmc@gmail.com
                </p>
                <p className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +975 17573827
                </p>
              </div>

              {/* Added Image */}
              <div className="mt-8">
                <img
                  src={contactUs} // Replace with your image path
                  alt="Contact visual"
                  className="w-full h-auto rounded-lg object-cover"
                  style={{ maxHeight: "300px" }}
                />
              </div>
            </div>

            {/* Right side - Contact Form (unchanged) */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    placeholder="Write..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ part ============================================================================== */}
      <div
        id="faq"
        className="relative py-16"
        style={{
          backgroundImage: `url(${FAQImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "50vh",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h2>

          <p className="text-xl text-center mb-8 max-w-3xl mx-auto">
            If you can not find answer to your question in our FAQ, you can
            always contact us or email us. We will answer you shortly!
          </p>

          <div className="flex justify-center gap-6 mb-12">
            <button className="border-2 border-white text-white hover:bg-white hover:bg-opacity-10 font-medium py-2 px-6 rounded-lg transition-colors">
              Email Us
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:bg-opacity-10 font-medium py-2 px-6 rounded-lg transition-colors">
              Contact Us
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">How secure is TERA?</h3>
              <p className="text-gray-200">
                TERA uses blockchain technology to ensure tamper-proof
                records...
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                What documents are required for registration?
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-200">
                <li>Government-issued ID</li>
                <li>Proof of ownership</li>
                <li>Recent utility bill</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                How long does the verification process take?
              </h3>
              <p className="text-gray-200">Typically 3-5 business days...</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                What if I forget my password?
              </h3>
              <p className="text-gray-200">
                Use our password recovery system...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* footer part====================================================================== */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="space-y-2">
                <p className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  teragmc@gmail.com
                </p>
                <p className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +975 17573827
                </p>
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 3.807.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} TERA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
