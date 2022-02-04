const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
    answerAuthor: ID
    answerBody: String
    comments: [Comment]!
    points: Int
    upVotedBy: ID
    downVotedBy: ID 
    createdAt: String
    updatedAt: String
  }


  type Comment {
    _id: ID
    commentAuthor: ID
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
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addQuestion(questionText: String!): Question
    addAnswer(answerBody: String!, questionId: ID!): Question 
    removeAnswer(answerBody: String!, questionId: ID!): Question 
    addComment(questionId: ID!, commentText: String!): Question
    removeQuestion(questionId: ID!): Question
    removeComment(questionId: ID!, commentId: ID!): Question
  }
`;

module.exports = typeDefs;
