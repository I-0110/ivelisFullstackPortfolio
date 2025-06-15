import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($userId: ID!, $project: String!) {
    addProject(userId: $userId, project: $project) {
      _id
      name
      projects
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        role
      }
    }
  }
`;

export const REMOVE_PROJECT = gql`
  mutation removeProject($project: String!) {
    removeProject(project: $project) {
      _id
      name
      projects
    }
  }
`;
