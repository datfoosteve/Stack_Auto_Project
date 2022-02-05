const { gql } = require('apollo-server-express');

const typeDefs = gql`
  
  type Author {
    id: ID!
    username: String!
  }
  
  type User {
    _id: ID
    username: String
    email: String
    password: String
    questions: [Question]!
    answers: [Answer]!
    comments: [Comment]!
  }

  type Question {
    _id: ID
    questionAuthor: User
    questionTitle: String
    questionBody: String
    comments: [Comment]!
    answers: [Answer]!
    upVotedBy: ID
    downVotedBy: ID 
    acceptedAnswer: ID
    createdAt: String
    updatedAt: String
  }

  
  type Answer {
    _id: ID
    answerAuthor: User
    answerBody: String
    comments: [Comment]!
    answerToQuestion: ID
    points: Int
    upVotedBy: [User]
    downVotedBy: [User] 
    createdAt: String
    updatedAt: String
  }

  type Comment {
    _id: ID
    commentAuthor: User
    commentBody: String
    createdAt: String
    updatedAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    questions(_id: ID!): [Question]
    question(_id: ID!): Question
    answers: [Answer]
    answer(_id: ID!): Answer
    comments: [Comment]
    comment(_id: ID!): Comment
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addQuestion(questionTitle: String!, questionBody: String!): Question
    removeQuestion(questionId: ID!): Question

    addAnswer(questionId: ID!, answerBody: String!): Answer 
    removeAnswer( questionId: ID!, answerId: ID!): Answer

    addCommentToQuestion(questionId: ID!, commentBody: String!): Comment
    removeCommentFromQuestion(questionId: ID!, commentId: ID!): Comment

    addCommentToAnswer(answerId: ID!, commentBody: String!): Comment
    removeCommentFromAnswer(answerId: ID!, commentId: ID!): Comment
  }
`;

module.exports = typeDefs;


// mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
//   createReview(episode: $ep, review: $review) {
//     stars
//     commentary
//   }
// }