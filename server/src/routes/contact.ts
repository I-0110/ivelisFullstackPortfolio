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
        console.log('Generated token:', confirmationToken);

        const savedToken = await new Token({ 
            token: confirmationToken, 
            submissionId: submission._id }).save();
        console.log('🟢 Saved Token:', savedToken);

        try {
            const result = await savedToken.save();
            console.log('Token successfully saved:', result);
        } catch (err) {
            console.error('Error saving token:', err);
            return res.status(500).json({ message: 'Failed to save token' });
        }

        await new Token({
            token: confirmationToken,
            submissionId: submission._id,
        }).save();
        
        await sendConfirmationEmail(email, name, confirmationToken);

        return res.status(200).json({ message: 'Confirmation email sent!' });
    } catch (err) {
        console.error('Error handling contact form:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;