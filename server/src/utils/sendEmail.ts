import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

export const sendConfirmationEmail = async (to: string, name: string, token: string) => {
    const link = `https://ivelisbecker.onrender.com/confirm?token=${token}`;
    await transporter.sendMail({
        from: `"Ivelis Becker" <${process.env.GMAIL_USER}>`,
        to, 
        subject: 'Please confirm your message',
        html: `
        <p>Hi ${name},</p>
        <p>Click the link below to confirm your message:</p>
        <a href="${link}">Confirm your message</a>
        `,
    });
};

export const sendToOwner =  async (submission: any) => {
    try {
        // Step 1: Send the original message from the client
        await transporter.sendMail({
            from: submission.email,
            to: 'ivelisbecker@gmail.com',
            subject: `Mira, nuevo mensaje de ${submission.name}`,
            html: `
            <p><strong>Name:</strong> ${submission.name}</p>
            <p><strong>Email:</strong> ${submission.email}</p>
            <p><strong>Message:</strong><br>${submission.message}</p>
            `,
        });

        // Step 2: Send a confirmation notice to you
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: 'ivelisbecker@gmail.com',
            subject: `✅ ${submission.name} confirmó su mensaje`,
            html:`
                <p>Este contacto ha confirmado su mensaje:<p>
                <ul>
                    <li><strong>Nombre:</strong> ${submission.name}</li>
                    <li><strong>Email:</strong> ${submission.email}</li>
                </ul>
                <p>Responderle rapido.</p>
            `,
        });
    } catch(err) {
        console.error('Email sending failed:', err);
        throw err;
    }
};

console.log('GMAIL_USER:', process.env.GMAIL_USER);
console.log('GMAIL_PASS:', process.env.GMAIL_PASS ? 'SET' : 'NOT SET');