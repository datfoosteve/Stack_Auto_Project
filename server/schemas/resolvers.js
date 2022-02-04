const { AuthenticationError } = require('apollo-server-express');
const { User, Question, Comment, Answer } = require('../models');
const { populate } = require('../models/User');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('questions').populate('questionAuthor');
    },
    user: async (parent, { _id }) => {
      return User.findOne({ _id }).populate('questions').populate('questionAuthor');
    },
    questions: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Question.find(params).populate('questionAuthor').sort({ createdAt: -1 });
    },
    question: async (parent, { _id }) => {
      return Question.findOne({ _id }).populate('questionAuthor');
    },
    answers: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Answer.find({}).populate('answerAuthor').sort({ createdAt: -1 });
    },
    answer: async (parent, { _id }, context) => {
      return Answer.findOne({ _id }).populate('answerAuthor');
    },
    comments: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Comment.find({}).populate('commentAuthor').sort({ createdAt: -1 });
    },
    comment: async (parent, { _id }, context) => {
      return Comment.findOne({ _id }).populate('commentAuthor');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('questions');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addQuestion: async (parent, { _id }, context) => {
      if (context.user) {
        const newQuestion = await Question.create({
          _id,
          questionBody

        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { questions: newQuestion._id } }
        );

        return newQuestion;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeQuestion: async (parent, { questionId }, context) => {
      if (context.user) {
        const question = await Question.findOneAndDelete({
          _id: questionId,
          questionAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { questions: question._id } }
        );

        return question;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addAnswer: async (parent, { questionId, answerBody }, context) => {
      if (context.user) {
        return Question.findOneAndUpdate(
          { _id: questionId },
          {
            $addToSet: {
              answers: { answerBody, answerAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    removeAnswer: async (parent, { questionId, answerId }, context) => {
      if (context.user) {
        return Question.findOneAndUpdate(
          { _id: questionId },
          {
            $pull: {
              answers: {
                _id: answerId,
                answerAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    addAnswer: async (parent, { questionId, answerBody }, context) => {
      if (context.user) {
        return Question.findOneAndUpdate(
          { _id: questionId },
          {
            $addToSet: {
              answers: { answerBody, answerAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    removeAnswer: async (parent, { questionId, answerId }, context) => {
      if (context.user) {
        return Question.findOneAndUpdate(
          { _id: questionId },
          {
            $pull: {
              answers: {
                _id: answerId,
                answerAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },
};

module.exports = resolvers;
