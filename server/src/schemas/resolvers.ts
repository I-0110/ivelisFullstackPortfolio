import { User } from '../models/index.js';
import ContactSubmission from "../models/ContactSubmission.js"
import crypto from 'crypto';
import { sendConfirmationEmail, sendToOwner } from '../utils/sendEmail.js';

import { signToken, AuthenticationError } from '../utils/auth.js';

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  projects: string[];
  role?: 'user' | 'admin';
}

interface UserArgs {
  userId: string;
}

interface AddUserArgs {
  input:{
    name: string;
    email: string;
    password: string;
    role?: 'user' | 'admin';
  }
}

interface AddProjectArgs {
  userId: string;
  project: string;
}

interface RemoveProjectArgs {
  userId: string;
  project: string;
}

interface Context {
  user?: User;
}

const resolvers = {
  Query: {
    users: async (): Promise<User[]> => {
      return await User.find();
    },
    user: async (_parent: any, { userId }: UserArgs): Promise<User | null> => {
      const user = await User.findOne({ _id: userId });
      if(!user) throw new Error('User not found');
      return user;
    },
    me: async (_parent: any, _args: any, context: Context): Promise<User | null> => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    async submitContactForm(_: any, { name, email, message }: any) {
      const token = crypto.randomBytes(20).toString('hex');

      await ContactSubmission.create({ name, email, message, token, confirmed: false });

      await sendConfirmationEmail(email, name, token);

      return 'Confirmation email sent. Please check your inbox.';
    },

    async confirmContactSubmission(_: any, { token }: any) {
      const submission = await ContactSubmission.findOne({ token });

      if (!submission || submission.confirmed) {
        throw new Error('Invalid or expired token');
      }

      submission.confirmed = true;
      await submission.save();

      await sendToOwner(submission);

      return 'Your message has been confirmed and sent.';
    },

    addUser: async (_parent: any, { input }: AddUserArgs): Promise<{ token: string; user: User }> => {
      // Only allow admin to create another admin
      const isAdminEmail = input.email === process.env.ADMIN_EMAIL;
      const role = isAdminEmail ? 'admin' : 'user';

      const user = await User.create({ ...input, role }) as User;
      const token = signToken( user._id, user.role );
      return { token, user };
    },
    login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: User }> => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }

      // Enforce admin status based on one email. Comment this if it has multiple admins
      const isAdminEmail = email === process.env.ADMIN_EMAIL;
      if (isAdminEmail && user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
      }

      // uncomment if this website includes multiple admins. Also, use 'ADMIN_EMAILS' instead of a single on .env 
      // const adminEmails =  process.env.ADMIN_EMAILS?.split(',') || [];
      //const isAdminEmail = adminEmails.includes(input.email);

      const token = signToken(user._id, user.role);
      return { token, user };
    },
    addProject: async (_parent: any, { userId, project }: AddProjectArgs, context: Context): Promise<User | null> => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: { projects: project },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeUser: async (_parent: any, _args: any, context: Context): Promise<User | null> => {
      if (context.user) {
        return await User.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    removeProject: async (_parent: any, { project }: RemoveProjectArgs, context: Context): Promise<User | null> => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { projects: project } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

export default resolvers;
