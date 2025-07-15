import mongoose from 'mongoose';

const ContactSubmissionSchema = new mongoose.Schema({
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    message: String,
    token: String, 
    confirmed: { type: Boolean, default: false },
    createAt: { type: Date, default: Date.now },
});

const ContactSubmission = mongoose.model('ContactSubmission', ContactSubmissionSchema);
export default ContactSubmission;