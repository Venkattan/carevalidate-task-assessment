import { gql } from '@apollo/client'

// Auth queries and mutations
export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      access_token
      user {
        id
        email
        name
        createdAt
      }
    }
  }
`

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      access_token
      user {
        id
        email
        name
        createdAt
      }
    }
  }
`

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      name
      createdAt
    }
  }
`

// Project queries and mutations
export const GET_PROJECTS_QUERY = gql`
  query GetProjects {
    projects {
      id
      name
      description
      createdAt
      updatedAt
      members {
        id
        name
        email
      }
    }
  }
`

export const GET_PROJECT_QUERY = gql`
  query GetProject($id: String!) {
    project(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      members {
        id
        name
        email
      }
    }
  }
`

export const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      name
      description
      createdAt
      members {
        id
        name
        email
      }
    }
  }
`

export const ADD_PROJECT_MEMBER_MUTATION = gql`
  mutation AddProjectMember($projectId: String!, $userId: String!) {
    addProjectMember(projectId: $projectId, userId: $userId) {
      id
      name
      members {
        id
        name
        email
      }
    }
  }
`

// Task queries and mutations
export const GET_TASKS_QUERY = gql`
  query GetTasks($projectId: String!, $status: String, $assignedTo: String, $limit: Float, $offset: Float) {
    tasks(projectId: $projectId, status: $status, assignedTo: $assignedTo, limit: $limit, offset: $offset) {
      edges {
        node {
          id
          title
          description
          status
          priority
          dueDate
          createdAt
          updatedAt
          creator {
            id
            name
            email
          }
          assignee {
            id
            name
            email
          }
          project {
            id
            name
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`

export const GET_TASK_QUERY = gql`
  query GetTask($id: String!) {
    task(id: $id) {
      id
      title
      description
      status
      priority
      dueDate
      createdAt
      updatedAt
      creator {
        id
        name
        email
      }
      assignee {
        id
        name
        email
      }
      project {
        id
        name
      }
      comments {
        id
        content
        createdAt
        author {
          id
          name
          email
        }
      }
    }
  }
`

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      status
      priority
      dueDate
      createdAt
      creator {
        id
        name
        email
      }
      assignee {
        id
        name
        email
      }
      project {
        id
        name
      }
    }
  }
`

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($id: String!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      title
      description
      status
      priority
      dueDate
      updatedAt
      creator {
        id
        name
        email
      }
      assignee {
        id
        name
        email
      }
    }
  }
`

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id)
  }
`

export const ASSIGN_TASK_MUTATION = gql`
  mutation AssignTask($taskId: String!, $userId: String!) {
    assignTask(taskId: $taskId, userId: $userId) {
      id
      assignee {
        id
        name
        email
      }
    }
  }
`

export const ADD_COMMENT_MUTATION = gql`
  mutation AddComment($taskId: String!, $content: String!) {
    addComment(taskId: $taskId, content: $content) {
      id
      content
      createdAt
      author {
        id
        name
        email
      }
    }
  }
`

// Subscriptions
export const TASK_CREATED_SUBSCRIPTION = gql`
  subscription TaskCreated($projectId: String!) {
    taskCreated(projectId: $projectId) {
      id
      title
      description
      status
      priority
      dueDate
      createdAt
      creator {
        id
        name
        email
      }
      assignee {
        id
        name
        email
      }
      project {
        id
        name
      }
    }
  }
`

export const TASK_UPDATED_SUBSCRIPTION = gql`
  subscription TaskUpdated($projectId: String!) {
    taskUpdated(projectId: $projectId) {
      id
      title
      description
      status
      priority
      dueDate
      updatedAt
      creator {
        id
        name
        email
      }
      assignee {
        id
        name
        email
      }
    }
  }
`

export const TASK_DELETED_SUBSCRIPTION = gql`
  subscription TaskDeleted($projectId: String!) {
    taskDeleted(projectId: $projectId)
  }
`

export const COMMENT_ADDED_SUBSCRIPTION = gql`
  subscription CommentAdded($taskId: String!) {
    commentAdded(taskId: $taskId) {
      id
      content
      createdAt
      author {
        id
        name
        email
      }
    }
  }
`

// Users query
export const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`
