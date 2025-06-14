import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  skills: string[];
}

interface UserArgs {
  profileId: string;
}

interface AddUserArgs {
  input:{
    name: string;
    email: string;
    password: string;
  }
}

interface AddSkillArgs {
  profileId: string;
  skill: string;
}

interface RemoveSkillArgs {
  profileId: string;
  skill: string;
}

interface Context {
  user?: User;
}

const resolvers = {
  Query: {
    profiles: async (): Promise<User[]> => {
      return await User.find();
    },
    profile: async (_parent: any, { profileId }: UserArgs): Promise<User | null> => {
      return await User.findOne({ _id: profileId });
    },
    me: async (_parent: any, _args: any, context: Context): Promise<User | null> => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    addProfile: async (_parent: any, { input }: AddProfileArgs): Promise<{ token: string; profile: Profile }> => {
      const profile = await User.create({ ...input });
      const token = signToken(profile.name, profile.email, profile._id);
      return { token, profile };
    },
    login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; profile: Profile }> => {
      const profile = await User.findOne({ email });
      if (!profile) {
        throw AuthenticationError;
      }
      const correctPw = await profile.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(profile.name, profile.email, profile._id);
      return { token, profile };
    },
    addSkill: async (_parent: any, { profileId, skill }: AddSkillArgs, context: Context): Promise<Profile | null> => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: profileId },
          {
            $addToSet: { skills: skill },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeProfile: async (_parent: any, _args: any, context: Context): Promise<User | null> => {
      if (context.user) {
        return await User.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    removeSkill: async (_parent: any, { skill }: RemoveSkillArgs, context: Context): Promise<Profile | null> => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { skills: skill } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

export default resolvers;
