import { ref, computed, reactive } from 'vue'
import type { User, Project, Task, NotificationMessage } from '@/types'

// Auth state
export const currentUser = ref<User | null>(null)
export const isAuthenticated = computed(() => !!currentUser.value)

// Project state
export const projects = ref<Project[]>([])
export const currentProject = ref<Project | null>(null)

// Task state
export const tasks = ref<Task[]>([])
export const selectedTask = ref<Task | null>(null)

// UI state
export const notifications = ref<NotificationMessage[]>([])
export const isLoading = reactive({
  auth: false,
  projects: false,
  tasks: false,
  creating: false,
  updating: false,
})

// Auth actions
export function setCurrentUser(user: User | null) {
  // Clone the user object to avoid Apollo Client's frozen object
  currentUser.value = user ? { ...user } : null
}

export function logout() {
  currentUser.value = null
  localStorage.removeItem('access_token')
  // Clear all state
  projects.value = []
  currentProject.value = null
  tasks.value = []
  selectedTask.value = null
}

// Project actions
export function setProjects(newProjects: Project[]) {
  // Clone the array and objects to avoid Apollo Client's frozen objects
  projects.value = newProjects.map(project => ({ ...project }))
}

export function addProject(project: Project) {
  // Clone the project object to avoid Apollo Client's frozen object
  projects.value.push({ ...project })
}

export function updateProject(updatedProject: Project) {
  const index = projects.value.findIndex((p: Project) => p.id === updatedProject.id)
  if (index !== -1) {
    // Clone the updated project to avoid Apollo Client's frozen object
    projects.value[index] = { ...updatedProject }
  }
}

export function setCurrentProject(project: Project | null) {
  currentProject.value = project
}

// Task actions
export function setTasks(newTasks: Task[]) {
  // Clone the array and objects to avoid Apollo Client's frozen objects
  tasks.value = newTasks.map(task => ({ ...task }))
}

export function addTask(task: Task) {
  // Check if task already exists to prevent duplicates from real-time updates
  const exists = tasks.value.some((t: Task) => t.id === task.id)
  if (!exists) {
    // Clone the task object to avoid Apollo Client's frozen object
    tasks.value.push({ ...task })
  }
}

export function updateTask(updatedTask: Task) {
  const index = tasks.value.findIndex((t: Task) => t.id === updatedTask.id)
  if (index !== -1) {
    // Clone the updated task to avoid Apollo Client's frozen object
    tasks.value[index] = { ...updatedTask }
  }
}

export function removeTask(taskId: string) {
  const index = tasks.value.findIndex((t: Task) => t.id === taskId)
  if (index !== -1) {
    tasks.value.splice(index, 1)
  }
}

export function setSelectedTask(task: Task | null) {
  selectedTask.value = task
}

// Notification actions
export function addNotification(notification: Omit<NotificationMessage, 'id' | 'timestamp'>) {
  const newNotification: NotificationMessage = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    ...notification
  }
  notifications.value.push(newNotification)
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    removeNotification(newNotification.id)
  }, 5000)
}

export function removeNotification(id: string) {
  const index = notifications.value.findIndex((n: NotificationMessage) => n.id === id)
  if (index !== -1) {
    notifications.value.splice(index, 1)
  }
}

// Loading state actions
export function setLoading(key: keyof typeof isLoading, value: boolean) {
  isLoading[key] = value
}

// Computed helpers
export const projectsById = computed(() => {
  return projects.value.reduce((acc: Record<string, Project>, project: Project) => {
    acc[project.id] = project
    return acc
  }, {} as Record<string, Project>)
})

export const tasksByStatus = computed(() => {
  return tasks.value.reduce((acc: Record<string, Task[]>, task: Task) => {
    if (!acc[task.status]) {
      acc[task.status] = []
    }
    acc[task.status].push(task)
    return acc
  }, {} as Record<string, Task[]>)
})

export const tasksByPriority = computed(() => {
  return tasks.value.reduce((acc: Record<string, Task[]>, task: Task) => {
    if (!acc[task.priority]) {
      acc[task.priority] = []
    }
    acc[task.priority].push(task)
    return acc
  }, {} as Record<string, Task[]>)
})
