import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
const resolvers = {
    Query: {
        users: async () => {
            return await User.find();
        },
        user: async (_parent, { userId }) => {
            const user = await User.findOne({ _id: userId });
            if (!user)
                throw new Error('User not found');
            return user;
        },
        me: async (_parent, _args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
        },
    },
    Mutation: {
        addUser: async (_parent, { input }, context) => {
            // Only allow admin to create another admin
            const role = context.user?.role === 'admin' && input.role === 'admin' ? 'admin' : 'user';
            const user = await User.create({ ...input, role });
            const token = signToken(user._id, user.role);
            return { token, user };
        },
        login: async (_parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw AuthenticationError;
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw AuthenticationError;
            }
            const token = signToken(user._id, user.role);
            return { token, user };
        },
        addProject: async (_parent, { userId, project }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate({ _id: userId }, {
                    $addToSet: { projects: project },
                }, {
                    new: true,
                    runValidators: true,
                });
            }
            throw AuthenticationError;
        },
        removeUser: async (_parent, _args, context) => {
            if (context.user) {
                return await User.findOneAndDelete({ _id: context.user._id });
            }
            throw AuthenticationError;
        },
        removeProject: async (_parent, { project }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate({ _id: context.user._id }, { $pull: { projects: project } }, { new: true });
            }
            throw AuthenticationError;
        },
    },
};
export default resolvers;
