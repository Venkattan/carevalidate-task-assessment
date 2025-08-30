// Enums as const objects for type safety
export const TaskStatus = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  REVIEW: 'REVIEW',
  DONE: 'DONE'
} as const

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus]

export const TaskPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
} as const

export type TaskPriority = typeof TaskPriority[keyof typeof TaskPriority]

// Core types
export interface User {
  id: string
  email: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
  members: User[]
  tasks?: Task[]
}

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: string
  createdAt: string
  updatedAt: string
  createdBy: string
  assignedTo?: string
  projectId: string
  creator: User
  assignee?: User
  project: Project
  comments?: Comment[]
}

export interface Comment {
  id: string
  content: string
  createdAt: string
  author: User
}

export interface TaskComment {
  id: string
  content: string
  createdAt: string
  author: User
  task: Task
}

export interface TaskEdge {
  node: Task
  cursor: string
}

export interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor?: string
  endCursor?: string
}

export interface TaskConnection {
  edges: TaskEdge[]
  pageInfo: PageInfo
  totalCount: number
}

export interface AuthPayload {
  access_token: string
  user: User
}

// Input types
export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  email: string
  password: string
  name: string
}

export interface CreateProjectInput {
  name: string
  description?: string
}

export interface CreateTaskInput {
  title: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  dueDate?: string
  projectId: string
  assignedTo?: string
}

export interface UpdateTaskInput {
  title?: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  dueDate?: string
  assignedTo?: string
}

// UI-specific types
export interface TaskFilter {
  status?: TaskStatus
  assignedTo?: string
  priority?: TaskPriority
}

export interface NotificationMessage {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
  timestamp: string
}
