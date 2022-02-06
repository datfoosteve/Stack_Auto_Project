import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!,$email: String! $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      
    token
    user
    {
username
      email
    }
  }
}
`;

export const ADD_QUESTION = gql`
 mutation addQuestion($questionTitle: String!, $questionBody: String!) {
  addQuestion(questionTitle: $questionTitle, questionBody: $questionBody) {
    _id
  }
}
`;

export const ADD_ANSWER = gql`
  mutation addAnswer($questionId: ID!, $answerBody: String!) {
    addAnswser(questionId: $questionId, answerBody: $answerBody) {
      _id
      questionBody
      questionAuthor
      createdAt
      answers {
        _id
        answerBody
        createdAt
      }
    }
  }
`;
