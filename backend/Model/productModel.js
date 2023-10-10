const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: {
        type: String
    },
    availability: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    }, 
    title: {
        type: String,
        required: true
    },
    totalReviews: {
        type: String,
        required: true
    }
}, { timestamps: true }
)

module.exports = mongoose.model("Products", productSchema);