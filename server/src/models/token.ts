import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    token: {
        type: String, 
        required: true,
    },
    submissionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContactSubmission',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400, // 24 hours in seconds
    },
});

const Token = mongoose.model('Token', TokenSchema);
export default Token;