const mongoose = require('mongoose');
// const timestamp = require('../utils/dateFormat');
const { Schema } = mongoose;


const Comment = require('./Comment');

const answerSchema = new Schema({

    answerAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    answerBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    // comments: [Comment.schema],
    comments: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }],
    answerToQuestion: {
        type: Schema.Types.ObjectId,
        ref: 'Question' 
    },
    points: {
        type: Number,
        default: 0,
    },
    upVotedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downVotedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
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
    

})


const Answer = mongoose.model('Answer', answerSchema);

module.exports =  Answer;  
