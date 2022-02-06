const mongoose = require('mongoose');
// const timestamp = require( '../utils/dateFormat');
const { Schema } = mongoose;

const Answer  = require('./Answer');
const Comment  = require('./Comment');


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
  // comments: [Comment.schema],
comments: [{ 
  type: Schema.Types.ObjectId,
  ref: 'Comment'
}],
answers: [{ 
  type: Schema.Types.ObjectId,
  ref: 'Answer'
}],

  // answers: [Answer.schema],
  
  upVotedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  downVotedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  acceptedAnswer: {
    type: Schema.Types.ObjectId,
    ref: 'Answer',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // get: (timestamp) => dateFormat(timestamp),
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    // get: (timestamp) => dateFormat(timestamp),
  },

});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
