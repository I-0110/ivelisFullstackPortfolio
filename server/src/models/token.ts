import mongoose, { Schema, Document, Types } from "mongoose";

export interface IToken extends Document {
    token: string;
    submissionId: Types.ObjectId;
    createdAt: Date;
}

const TokenSchema = new Schema<IToken>({
    token: {
        type: String, 
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 900, // 15 minutes in seconds
    },
});

const Token = mongoose.model<IToken>('Token', TokenSchema);
export default Token;