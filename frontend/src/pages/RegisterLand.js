import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterLand = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    landType: "",
    location: "",
    landSize: "",
    boundaryDetails: "",
    ownerName: "",
    cidNumber: "",
    contactNumber: "",
    emailAddress: "",
    ownershipType: "",
    coOwners: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/govtland/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Land registered successfully!");
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Register Land</h2>

        {Object.keys(formData).map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={key !== "coOwners"}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Register Land
        </button>
      </form>
    </div>
  );
};

export default RegisterLand;
