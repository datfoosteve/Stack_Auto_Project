import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
     
      questions {
        _id
        questionBody
      }
    }
  }
`;

export const QUERY_QUESTIONS = gql`
query {
  questions {
  _id
  questionBody
  questionTitle
  createdAt
    questionAuthor {
      username
    }
    questionTitle
    questionBody
  }
}
`;

export const QUERY_SINGLE_QUESTION = gql`
 query question($_id: ID!) {
    question(_id: $_id) {
      _id
      questionBody
      questionAuthor {
        username
      }
      createdAt
      questionTitle
      }
    }
  
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      
      username
      email
      questions {
        _id
        questionBody

        createdAt
      }
    }
  }
`;
