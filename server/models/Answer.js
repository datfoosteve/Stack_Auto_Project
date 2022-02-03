const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
    comments: [commentSchema],
    points: {
        type: Number,
        default: 0,
    },
    upVotedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    downVotedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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

})



const Answer = model('Answer', answerSchema);

module.exports = Answer;
