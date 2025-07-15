import express from 'express';
import crypto from 'crypto';
import ContactSubmission from '../models/ContactSubmission.js';
import Token from '../models/token.js';
import { sendConfirmationEmail } from '../utils/sendEmail.js';

const router = express.Router();

router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const submission = await new ContactSubmission({ name, email, message }).save();

        const confirmationToken = crypto.randomBytes(32).toString('hex');
        console.log('Generate token:', confirmationToken);

        await new Token({
            token: confirmationToken,
            submissionId: submission._id,
        }).save();

        const savedToken = await new Token({ 
            token: confirmationToken, 
            submissionId: submission._id }).save();
        console.log('🟢 Saved Token:', savedToken);
        
        await sendConfirmationEmail(email, name, confirmationToken);

        res.status(200).json({ message: 'Confirmation email sent!' });
    } catch (err) {
        console.error('Error handling contact form:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;