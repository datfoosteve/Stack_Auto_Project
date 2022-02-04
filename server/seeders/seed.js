const db = require('../config/connection');
const { User, Question, Comment, Answer } = require('../models');
const userSeeds = require('./userSeeds.json');
const questionSeeds = require('./questionSeeds.json');
const commentSeeds = require('./commentSeeds.json');
const answerSeeds = require('./answerSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Question.deleteMany({});
    await Answer.deleteMany({});
    await Comment.deleteMany({});


    const users = await User.create(userSeeds);
    const questions = await Question.create(questionSeeds);
    const answers = await Answer.create(answerSeeds);
    const comments = await Comment.create(commentSeeds);

   for (newQuestion of questions) {

    const tempUser = users[Math.floor(Math.random() * users.length)];
    const tempUser2 = users[Math.floor(Math.random() * users.length)];
    const tempUser3 = users[Math.floor(Math.random() * users.length)];
    tempUser.questions.push(newQuestion._id); 
    newQuestion.questionAuthor = tempUser._id;
    newQuestion.upVotedBy.push(tempUser2._id);
    newQuestion.downVotedBy.push(tempUser3._id);
    await tempUser.save();
    await newQuestion.save();
   }


   for (newAnswer of answers) {
    const tempUser = users[Math.floor(Math.random() * users.length)];
    const tempUser2 = users[Math.floor(Math.random() * users.length)];
    const tempUser3 = users[Math.floor(Math.random() * users.length)];
    tempUser.answers.push(newAnswer._id); 
    newAnswer.answerAuthor = tempUser._id;
    const tempQuestion = questions[Math.floor(Math.random() * questions.length)];
    tempQuestion.answers.push(newAnswer._id);
    newAnswer.answerToQuestion = tempQuestion._id;
    newAnswer.upVotedBy.push(tempUser2._id);
    newAnswer.downVotedBy.push(tempUser3._id);
    await tempUser.save();
    await tempQuestion.save();
    await newAnswer.save();
   }


   for (newComment of comments) {
    const headsOrTails = Math.random() > 0.5;
    if(headsOrTails) {
      const tempQuestion = questions[Math.floor(Math.random() * questions.length)];
      tempQuestion.comments.push(newComment._id);
      await tempQuestion.save();
    } else {
      const tempAnswer = answers[Math.floor(Math.random() * answers.length)];
      tempAnswer.comments.push(newComment._id);
      await tempAnswer.save();
    }
    const tempUser = users[Math.floor(Math.random() * users.length)];
    newComment.commentAuthor = tempUser._id;
    tempUser.comments.push(newComment._id);
    await tempUser.save();
    await newComment.save();
   }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
