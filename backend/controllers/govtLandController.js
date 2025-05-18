import mongoose from "mongoose";

// Define the GovtLand schema
const govtLandSchema = new mongoose.Schema({
  landType: { type: String, required: true },
  location: { type: String, required: true },
  landSize: { type: String, required: true },
  boundaryDetails: { type: String, required: true },
  ownerName: { type: String, required: true },
  cidNumber: { type: String, required: true },
  contactNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  ownershipType: { type: String, required: true },
  coOwners: { type: [String], default: [] },
  ownershipProof: { type: String },
  thramCopy: { type: String },
  surveyReport: { type: String },
  taxClearance: { type: String },
  registrationDate: { type: Date, default: Date.now },
});

// Create the GovtLand model
const GovtLand = mongoose.model("GovtLand", govtLandSchema);

// Function to register a new GovtLand record
export const registerGovtLand = async (req, res) => {
  try {
    const { body } = req;

    console.log("JSON Body Received:", body);

    const newGovtLand = new GovtLand({
      landType: body.landType,
      location: body.location,
      landSize: body.landSize,
      boundaryDetails: body.boundaryDetails,
      ownerName: body.ownerName,
      cidNumber: body.cidNumber,
      contactNumber: body.contactNumber,
      emailAddress: body.emailAddress,
      ownershipType: body.ownershipType,
      coOwners: body.coOwners,
      ownershipProof: "",
      thramCopy: "",
      surveyReport: "",
      taxClearance: "",
    });

    const savedGovtLand = await newGovtLand.save();

    res.status(201).json({
      message: "Govt Land registered successfully (JSON only)!",
      data: savedGovtLand,
    });
  } catch (error) {
    console.error("Error registering govt land (JSON only):", error);
    res.status(500).json({
      message: "Error registering govt land (JSON only).",
      error: error.message,
    });
  }
};

// Controller to register land
export const registerLand = async (req, res) => {
  try {
    const {
      landType,
      location,
      landSize,
      boundaryDetails,
      ownerName,
      cidNumber,
      contactNumber,
      emailAddress,
      ownershipType,
      coOwners,
    } = req.body;

    // Create a new land record
    const newLand = new GovtLand({
      landType,
      location,
      landSize,
      boundaryDetails,
      ownerName,
      cidNumber,
      contactNumber,
      emailAddress,
      ownershipType,
      coOwners,
    });

    await newLand.save();
    res
      .status(201)
      .json({ message: "Land registered successfully", land: newLand });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering land", error: error.message });
  }
};

// Function to fetch all GovtLand records
export const getAllGovtLand = async (req, res) => {
  try {
    const govtLands = await GovtLand.find({}); // Fetch all documents

    // Transform data to match frontend expectations
    const transformedLands = govtLands.map((land) => ({
      id: land._id,
      owner: land.ownerName,
      landType: land.landType,
      location: land.location,
      landSize: land.landSize,
      boundaryDetails: land.boundaryDetails,
      cidNumber: land.cidNumber,
      contactNumber: land.contactNumber,
      emailAddress: land.emailAddress,
      ownershipType: land.ownershipType,
      coOwners: land.coOwners,
      ownershipProof: land.ownershipProof,
      thramCopy: land.thramCopy,
      surveyReport: land.surveyReport,
      taxClearance: land.taxClearance,
      date: land.createdAt,
    }));

    res.status(200).json({
      message: "Successfully fetched all Govt Land records",
      data: transformedLands,
    });
  } catch (error) {
    console.error("Error fetching Govt Land records:", error);
    res.status(500).json({
      message: "Failed to fetch Govt Land records",
      error: error.message,
    });
  }
};

// Function to fetch a single GovtLand record by ID
export const getGovtLandById = async (req, res) => {
  try {
    const id = req.params.id; // Get the ID from the request parameters
    const govtLand = await GovtLand.findById(id); // Find by ID

    if (!govtLand) {
      return res.status(404).json({ message: "Govt Land record not found" });
    }

    res.status(200).json({
      message: "Successfully fetched Govt Land record",
      data: govtLand,
    });
  } catch (error) {
    console.error("Error fetching Govt Land record by ID:", error);
    res.status(500).json({
      message: "Failed to fetch Govt Land record by ID",
      error: error.message,
    });
  }
};

// Function to delete a GovtLand record by ID
export const deleteGovtLandById = async (req, res) => {
  try {
    const id = req.params.id; // Get the ID from the request parameters

    const deletedLand = await GovtLand.findByIdAndDelete(id); // Delete the record by ID

    if (!deletedLand) {
      return res.status(404).json({ message: "Govt Land record not found" });
    }

    res.status(200).json({
      message: "Govt Land record deleted successfully",
      data: deletedLand,
    });
  } catch (error) {
    console.error("Error deleting Govt Land record by ID:", error);
    res.status(500).json({
      message: "Failed to delete Govt Land record",
      error: error.message,
    });
  }
};
