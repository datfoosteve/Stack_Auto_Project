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
    questions: async (parent) => {
   
      return Question.find().populate('questionAuthor').sort({ createdAt: -1 });
    },
    question: async (parent, { _id }) => {
      return Question.findOne({ _id }).populate('questionAuthor').populate('answers').populate('answerBody');
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
      console.log(username, email, password);
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
    addQuestion: async (parent, { questionTitle, questionBody }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const newQuestion = await Question.create({

         
          questionTitle: questionTitle,
          questionBody: questionBody
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
        const question = await Question.findByIdAndDelete(questionId);

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
        const answer = await Answer.create({
          answerAuthor: context.user,
          answerBody,
          answerToQuestion: questionId
        });
        await Question.findOneAndUpdate(
          { _id: questionId },
          {
            $addToSet: {
              answers: answer,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return answer;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeAnswer: async (parent, { questionId, answerId }, context) => {
      if (context.user) {
        const answer = await Answer.findByIdAndDelete(answerId);
        await Question.findOneAndUpdate(
          { _id: questionId },
          {
            $pull: {
              answers: answer._id,
            },
          },
        );
        return answer;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    addCommentToQuestion: async (parent, { questionId, commentBody }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          commentBody,
          commentAuthor: context.user._id
        });
        await Question.findOneAndUpdate(
          { _id: questionId },
          {
            $addToSet: {
              comments: comment,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        await User.findByIdAndUpdate(context.user._id, {$addToSet: {comments: comment}});
        return comment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addCommentToAnswer: async (parent, { answerId, commentBody }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          commentBody,
          commentAuthor: context.user._id,
          
        })
        await Answer.findOneAndUpdate(
          { _id: answerId },
          {
            $addToSet: {
              comments: comment,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        await User.findByIdAndUpdate(context.user._id, {$addToSet: {comments: comment}});
        return comment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeCommentFromQuestion: async (parent, { questionId, commentId }, context) => {
      if (context.user) {
        const comment = await Comment.findByIdAndDelete(commentId);
        await Question.findOneAndUpdate(
          { _id: questionId },
          {
            $pull: {
              comments: comment._id,
            },
          },
          { new: true }
        );
        await User.findByIdAndUpdate(context.user._id, {$pull: {comments: comment._id}});
        return comment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeCommentFromAnswer: async (parent, { answerId, commentId }, context) => {
      if (context.user) {
        const comment = await Comment.findByIdAndDelete(commentId);
        await Answer.findOneAndUpdate(
          { _id: answerId },
          {
            $pull: {
              comments: comment._id,
            },
          },
          { new: true }
        );
        await User.findByIdAndUpdate(context.user._id, {$pull: {comments: comment._id}});
        return comment;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },

};

module.exports = resolvers;
