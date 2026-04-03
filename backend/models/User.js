const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, sparse: true, unique: true },
    phoneNumber: { type: String, sparse: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    rating: {
        score: { type: Number, default: 0 },
        reviewsCount: { type: Number, default: 0 }
    }
}, { timestamps: true });

// Check that at least email or phoneNumber is provided
userSchema.pre('validate', function(next) {
    if (!this.email && !this.phoneNumber) {
        this.invalidate('email', 'Email or Phone Number is required');
        this.invalidate('phoneNumber', 'Email or Phone Number is required');
    }
    next();
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
