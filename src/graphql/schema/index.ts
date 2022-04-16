import { gql } from 'apollo-server-express';

const schema = gql(`#graphql

  """the Date type represent date in ISO format"""
  scalar Date

  """the Color type represent color in Hexadecimal format"""
  scalar Color

  ### Enums ###

  enum NoteVisibility {
    public
    private
  }

  enum Theme {
    dark
    light
    system
  }

  enum NoteSorting {
    title
    createdAt
    updatedAt
  }

  enum CollaboratorRole {
    editor
    viewer
    commenter
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

  input TagInput {
    color: Color
    label: String
  }

  input CollaboratorInput {
    userId: ID!
    role: CollaboratorRole
  }

  input NoteCreateInput {
    tag: TagInput
    title: String!
    content: String!
    isPinned: Boolean
    isPrivate: Boolean
    isStarred: Boolean
    isArchived: Boolean
    visibility: NoteVisibility
    collaborators: [CollaboratorInput!]
  }

  input NoteUpdateInput {
    title: String
    content: String
    isArchived: Boolean
    isPrivate: Boolean
    isPinned: Boolean
    isStarred: Boolean
    isAddedToTrash: Boolean
    visibility: NoteVisibility
  }

  ### Interfaces ###

  """An object with an ID"""
  interface Node {
    id: ID!
    createdAt: Date!
    updatedAt: Date!
  }

  interface NoteAuthor {
    name: String
    email: String!
    username: String!
    avatarUrl: String
  }

  interface Connection {
    totalNodes: Int!
    pageInfo: PageInfo!
  }

  ### Connections ###

  type NoteConnection implements Connection {
    nodes: [Note!]!
    totalNodes: Int!
    pageInfo: PageInfo!
  }

  type CollaboratorConnection implements Connection {
    nodes: [Collaborator!]!
    totalNodes: Int!
    pageInfo: PageInfo!
  }

  ### Responses ###

  type UserDeleteResponse {
    deleted: Boolean
  }

  type UserSignupResponse {
    authToken: String
    user: User
  }

  type UserLoginResponse {
    authToken: String
    user: User
  }

  type NoteDeleteResponse {
    deleted: Boolean
  }

  type PageInfo {
    limit: Int!
    total: Int!
    nextPage: Int!
    currentPage: Int!
    previousPage: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type UserPreference {
    theme: Theme!
    sortNoteBy: NoteSorting!
  }

  ##############

  type Tag implements Node {
    id: ID!
    label: ID!
    tagId: ID!
    userId: ID!
    color: Color
    createdAt: Date!
    updatedAt: Date!
  }

  type NoteActivity implements Node {
    id: ID!
    noteId: ID!
    action: String!
    activityId: ID!
    initiator: User!
    createdAt: Date!
    updatedAt: Date!
  }

  type NoteAttachment implements Node {
    id: ID!
    fileSize: Int!
    fileType: String!
    attachmentId: ID!
    createdAt: Date!
    updatedAt: Date!
  }

  """A collaborator is an individual who can view, comment or edit a note on Noteway"""
  type Collaborator implements Node {
    id: ID!
    noteId: ID!
    userId: ID!
    createdBy: User!
    createdAt: Date!
    updatedAt: Date!
    collaboratorId: ID!
    role: CollaboratorRole!
  }


  """A user is an individual's account on Noteway that owns notes"""
  type User implements Node & NoteAuthor {
    id: ID!
    userId: ID!
    name: String
    email: String!
    createdAt: Date!
    updatedAt: Date!
    username: String!
    avatarUrl: String!
    isDeactivated: Boolean!
    isEmailVerified: Boolean!
    preferences: UserPreference!
    notes(filter: UserNotesInput): NoteConnection!
    archivedNotes(filter: UserNotesInput): NoteConnection!
  }

  type Note implements Node {
    id: ID!
    tag: Tag
    noteId: ID!
    authorId: ID!
    author: User!
    title: String!
    content: String!
    createdAt: Date!
    updatedAt: Date!
    starredBy: [User!]!
    isPinned: Boolean!
    isPrivate: Boolean!
    isStarred: Boolean!
    isArchived: Boolean!
    isAddedToTrash: Boolean!
    visibility: NoteVisibility!
    activities: [NoteActivity!]!
    attachments: [NoteAttachment!]!
    collaborators(filter: UserNotesInput): [Collaborator!]!
  }


  ### Root
  type Query {
    # user query
    me: User
    user(filter: UserSearchInput!): User

    # note query
    note(noteId: ID!): Note
    notes(authorId: ID!): NoteConnection
    archivedNotes(authorId: ID!): NoteConnection

    collaborator(filter: CollaboratorSearchInput!): Collaborator
    collaborators(noteId: ID!): CollaboratorConnection
  }

  type Mutation {
    # user object mutation
    userDelete(userId: ID!): UserDeleteResponse
    userLogin(loginCredentials: UserLoginInput): UserLoginResponse
    userSignup(signupCredentials: UserSignupInput): UserSignupResponse

    # note object mutation
    noteDelete(noteId: ID!): NoteDeleteResponse
    noteUpdate(noteId: ID!, noteDetails: NoteUpdateInput!): Note
    noteCreate(noteDetails: NoteCreateInput!): Note
  }

`);

export {
  schema as default
};