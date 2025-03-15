const FooterDescription= require("../../models/footerModel");

// Add Offer
const addOffer = async (req, res) => {
    try {
      const { title, description } = req.body;
  
      if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required!" });
      }
  
      // Check for duplicate title
      const existingOffer = await FooterDescription.findOne({ title });
      if (existingOffer) {
        return res.status(400).json({ error: "Same data already exists!" });
      }
  
      // Save new offer
      const newOffer = new FooterDescription({ title, description });
      await newOffer.save();
  
      res.status(201).json({ success: true, message: "Data added successfully!" });
    } catch (error) {
      console.error("Server Error:", error.message);
      res.status(500).json({ error: "Server error, try again later!", details: error.message });
    }
  };
  
  // Get Latest Offers (Fix: Return as an array)
  const getOffer = async (req, res) => {
    try {
      const offer = await FooterDescription.find().sort({ _id: -1 }).limit(1); // Get latest 5 entries
      if (!offer || offer.length === 0) {
        return res.status(404).json({ error: "No data found!" });
      }
  
      res.status(200).json(offer); // Return as an array
    } catch (error) {
      console.error("Server Error:", error.message);
      res.status(500).json({ error: "Server error, try again later!", details: error.message });
    }
  };
  
  const updateOffer = async (req, res) => {
    try {
        const { id, ...updateData } = req.body; // Extract ID and update data

        if (!id) {
            return res.status(400).json({ message: "Offer ID is required for updating" });
        }

        const updatedOffer = await OfferModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedOffer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        res.status(200).json({ message: "Offer updated successfully", updatedOffer });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

  module.exports = { addOffer, getOffer ,updateOffer};
  