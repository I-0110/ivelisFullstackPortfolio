import express from 'express';
import type { Request, Response } from 'express';
import Token from '../models/token.js';
import { sendToOwner } from '../utils/sendEmail.js';
import ContactSubmission from '../models/ContactSubmission.js';

const router = express.Router();

const tokens = await Token.find();
console.log(`All tokens in DB:`, tokens);

router.get('/confirm', async (req: Request, res: Response) => {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
        return res.status(400).json({ message: `Missing or invalid token` });
    }

    try {
        const foundToken = await Token.findOne({ token });

        if (!foundToken) {
            return res.status(400).json({ message: `Invalid or expired token` });
        }

        const submission = await ContactSubmission.findOne({ _id: foundToken.submissionId });
        
        if (!submission) {
            return res.status(404).json({ message: `Submission not found` });
        }

        await sendToOwner(submission);

        await Token.deleteOne({ _id: foundToken._id });

        return res.redirect('https://ivelisbecker.onrender.com/confirmed');
    } catch (err) {
        console.error(`Error confirming submission:`, err);
        return res.status(500).json({ message: `Internal server error` });
    }
    
    console.log(`Query token:`, token);
});

export default router;
