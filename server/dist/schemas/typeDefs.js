const typeDefs = `
  type User {
    _id: ID
    name: String
    email: String
    projects: [String]!
    role: String!
  }

  type Auth {
    token: String!
    user: User
  }
  
  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth

    addProject(userId: ID!, project: String!): User
    removeUser: User
    removeProject(project: String!): User
  }
`;
export default typeDefs;
