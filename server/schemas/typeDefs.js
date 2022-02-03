const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    questions: [Question]!
  }

  type Question {
    questionAuthor: ID
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
    answerAuthor: ID
    answerBody: String
    comments: [Comment]!
    points: Number
    upVotedBy: ID
    downVotedBy: ID 
    createdAt: String
    updatedAt: String
  }


  type Comment {
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
    user(username: String!): User
    questions(username: String): [Question]
    question(questionId: ID!): Question
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addQuestion(questionText: String!): Question
    addComment(questionId: ID!, commentText: String!): Question
    removeQuestion(questionId: ID!): Question
    removeComment(questionId: ID!, commentId: ID!): Question
  }
`;

module.exports = typeDefs;
