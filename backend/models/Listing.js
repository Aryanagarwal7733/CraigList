const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    location: {
        city: { type: String, required: true },
        region: { type: String },
    },
    images: [{ url: String, public_id: String }],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, // not required during initial testing
    tags: [String]
}, { timestamps: true });

// Provide a basic text index for local search. 
// When deploying, MongoDB Atlas Search can be enabled over these fields natively.
listingSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Listing', listingSchema);
