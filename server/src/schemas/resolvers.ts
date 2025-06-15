import { User } from '../models/index.js';
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
    addUser: async (_parent: any, { input }: AddUserArgs, context: Context): Promise<{ token: string; user: User }> => {
      // Only allow admin to create another admin
      const isAdminEmail = input.email === 'ivelisbecker@gmail.com';
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

      // Enforce admin status based on email
      if (email === 'ivelisbecker@gmail.com' && user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
      }

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
