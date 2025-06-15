import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      name
      email
      role
      projects
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      projects
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      projects
    }
  }
`;
