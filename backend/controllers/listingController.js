const Listing = require('../models/Listing');

// @desc    Create new listing
// @route   POST /api/listings
// @access  Public (mocked for this prototype step)
const createListing = async (req, res) => {
    try {
        const { title, description, price, category, location, images } = req.body;

        if (!title || !description || !price || !category || !location || !location.city) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const listing = await Listing.create({
            title,
            description,
            price,
            category,
            location,
            images: images || [],
            // Note: In full auth system, tie this directly to req.user._id
        });

        res.status(201).json(listing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createListing };
