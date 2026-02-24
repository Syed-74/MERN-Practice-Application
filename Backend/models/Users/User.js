const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    password: { type: String, required: true },
    lastLogin: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    accountLevel: { type: String, enum: ['bronze', 'silver', 'gold'], default: 'bronze' },
    coverImage: { type: String, default: '' },
    bio: { type: String, default: '' },
    location: { type: String, default: '' },
    notifications: { email: { type: String } },
    gender: { type: String, enum: ['male', 'female', 'Prefer not to say'] },

    // Relationships
    profileViewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    accountVerificationToken: { type: String },
    accountVerificationExpires: { type: Date },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
