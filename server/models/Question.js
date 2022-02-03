const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { answerSchema, commentSchema } = require('./Answer');


const questionSchema = new Schema({
  questionAuthor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  questionTitle: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 4,
    default: 'Untitled',
  },
  questionBody: {
    type: String,
    required: 'You need to leave a question!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  comments: [commentSchema],
  answers: [answerSchema],
  upVotedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  downVotedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  acceptedAnswer: {
    type: Schema.Types.ObjectId,
    ref: 'Answer',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },

});

const Question = model('Question', questionSchema);

module.exports = Question;
