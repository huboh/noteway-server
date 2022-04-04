import { gql } from 'apollo-server-express';

const schema = gql(`#graphql

  """the Date type represent date in ISO format"""
  scalar Date

  """the Color type represent color in Hexadecimal format"""
  scalar Color

  ### Enums ###

  enum NoteVisibility {
    PUBLIC
    PRIVATE
  }

  enum Theme {
    DARK
    LIGHT
    SYSTEM_DEFAULT
  }

  ### Inputs ###

  input UserSearchInput {
    userId: ID
    email: String
    username: String
  }

  input UserNotesInput {
    page: Int
    limit: Int
    privacy: NoteVisibility
  }

  input CollaboratorSearchInput {
    userId: ID
    noteId: ID
  }

  input UserArchivedNotesInput {
    userId: ID
    email: String
    username: String
  }

  input UserSignupInput {
    email: String!
    password: ID!
    username: String
  }

  input UserLoginInput {
    email: String
    password: ID!
    username: String
  }

  ### Interfaces ###

  """An object with an ID"""
  interface Node {
    id: ID!
  }

  interface NoteAuthor {
    name: String
    email: String!
    username: String!
    avatarUrl: String
  }

  interface Connection {
    totalCount: Int!
    pageInfo: PageInfo!
  }

  ### Connections ###

  type NoteConnection {
    nodes: [Note]!
    totalCount: Int!
    pageInfo: PageInfo!
  }

  type CollaboratorConnection {
    totalCount: Int!
    pageInfo: PageInfo!
    nodes: [Collaborator]!
  }

  ### Responses ###

  type UserDeleteResponse {
    deleted: Boolean
  }

  type UserSignupResponse {
    token: String
    user: User
  }

  type UserLoginResponse {
    token: String
    user: User
  }

  type PageInfo {
    total: Int
    limit: Int
    currentPage: Int
    previousPage: Int
  }

  type Tag {
    color: Color
    label: String!
  }

  type UserPreference {
    theme: Theme!
  }

  type CollaboratorPermission {
    canAddCollaborators: Boolean!
  }


  ##############


  """A collaborator is an individual on Noteway that has been added as a collaborator on a note"""
  type Collaborator implements Node {
    id: ID!
    noteId: ID!
    addedBy: User!
    permissions: CollaboratorPermission!
  }

  """A user is an individual's account on Noteway that owns notes"""
  type User implements Node & NoteAuthor {
    id: ID!
    name: String
    email: String!
    createAt: Date!
    updatedAt: Date!
    username: String!
    avatarUrl: String
    isEmailVerified: Boolean!
    preferences: UserPreference!
    notes(filter: UserNotesInput): NoteConnection!
    archivedNotes(filter: UserNotesInput): NoteConnection!
  }

  type Note implements Node {
    id: ID!
    tags: [Tag]!
    author: User!
    title: String!
    createAt: Date!
    content: String!
    updatedAt: Date!
    isPrivate: Boolean!
    isArchived: Boolean!
    visibility: NoteVisibility!
    collaborators(filter: UserNotesInput): CollaboratorConnection!
  }


  ### Root
  type Query {
    me: User
    note(id: ID!): Note
    user(id: UserSearchInput!): User
    notes(filter: UserNotesInput!): [NoteConnection]
    archivedNotes(filter: UserArchivedNotesInput!): [NoteConnection]

    collaborator(filter: CollaboratorSearchInput!): Collaborator
    collaborators(noteId: ID!): CollaboratorConnection
  }

  type Mutation {
    # user object mutation
    userDelete(userId: ID!): UserDeleteResponse
    userLogin(loginCredentials: UserLoginInput): UserLoginResponse
    userSignup(signupCredentials: UserSignupInput): UserSignupResponse
  }

`);

export {
  schema as default
};