import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useSubscription } from '@vue/apollo-composable'
import { 
  TASK_CREATED_SUBSCRIPTION,
  TASK_UPDATED_SUBSCRIPTION,
  TASK_DELETED_SUBSCRIPTION,
  COMMENT_ADDED_SUBSCRIPTION
} from '@/apollo/queries'
import { 
  addTask, 
  updateTask, 
  removeTask, 
  addNotification,
  tasks,
  currentUser
} from '@/store'
import type { Task, Comment } from '@/types'

// Track recent user actions to avoid duplicate notifications
const recentUserActions = ref<Set<string>>(new Set())

function addUserAction(actionId: string) {
  recentUserActions.value.add(actionId)
  // Remove the action after 2 seconds
  setTimeout(() => {
    recentUserActions.value.delete(actionId)
  }, 2000)
}

function isUserAction(actionId: string): boolean {
  return recentUserActions.value.has(actionId)
}

export function useRealTimeUpdates(projectId?: string, taskId?: string) {
  const isConnected = ref(false)
  const connectionError = ref<string | null>(null)

  // Task subscriptions for projects
  let taskCreatedSub: any = null
  let taskUpdatedSub: any = null  
  let taskDeletedSub: any = null
  let commentAddedSub: any = null

  if (projectId) {
    taskCreatedSub = useSubscription(TASK_CREATED_SUBSCRIPTION, { projectId })
    taskUpdatedSub = useSubscription(TASK_UPDATED_SUBSCRIPTION, { projectId })
    taskDeletedSub = useSubscription(TASK_DELETED_SUBSCRIPTION, { projectId })

    // Watch for task created
    watch(() => taskCreatedSub.result.value, (result: any) => {
      if (result?.taskCreated) {
        const task = result.taskCreated
        const wasUserAction = task.createdBy?.id === currentUser.value?.id
        
        addTask(task)
        
        // Only show notification if it wasn't created by the current user
        if (!wasUserAction) {
          addNotification({
            type: 'info',
            title: 'New Task Created',
            message: `"${task.title}" was added by ${task.createdBy?.name || 'someone'}`
          })
        }
      }
    })

    // Watch for task updated
    watch(() => taskUpdatedSub.result.value, (result: any) => {
      if (result?.taskUpdated) {
        const task = result.taskUpdated
        const wasUserAction = task.updatedBy?.id === currentUser.value?.id
        
        updateTask(task)
        
        // Only show notification if it wasn't updated by the current user
        if (!wasUserAction) {
          addNotification({
            type: 'info',
            title: 'Task Updated',
            message: `"${task.title}" was updated by ${task.updatedBy?.name || 'someone'}`
          })
        }
      }
    })

    // Watch for task deleted
    watch(() => taskDeletedSub.result.value, (result: any) => {
      if (result?.taskDeleted) {
        const taskId = result.taskDeleted
        removeTask(taskId)
        addNotification({
          type: 'info',
          title: 'Task Deleted',
          message: 'A task was removed from the project'
        })
      }
    })

    // Watch for errors
    watch(() => taskCreatedSub.error.value, (error: any) => {
      if (error) {
        console.error('Task created subscription error:', error)
        connectionError.value = 'Failed to connect to real-time updates'
      }
    })
  }

  if (taskId) {
    commentAddedSub = useSubscription(COMMENT_ADDED_SUBSCRIPTION, { taskId })

    // Watch for comment added
    watch(() => commentAddedSub.result.value, (result: any) => {
      if (result?.commentAdded) {
        const comment = result.commentAdded
        addNotification({
          type: 'info',
          title: 'New Comment',
          message: `${comment.author.name} added a comment`
        })
        // The comment will be automatically updated in the task query cache
      }
    })

    // Watch for errors
    watch(() => commentAddedSub.error.value, (error: any) => {
      if (error) {
        console.error('Comment added subscription error:', error)
        connectionError.value = 'Failed to connect to real-time updates'
      }
    })
  }

  // Monitor connection status
  onMounted(() => {
    isConnected.value = true
    connectionError.value = null
  })

  onUnmounted(() => {
    isConnected.value = false
  })

  return {
    isConnected,
    connectionError,
    // Expose subscription refs for debugging
    taskCreatedSub,
    taskUpdatedSub,
    taskDeletedSub,
    commentAddedSub,
    // Export action tracking functions
    addUserAction,
    isUserAction
  }
}

// Composable for managing live data sync
export function useLiveSync() {
  const syncStatus = ref<'connected' | 'disconnected' | 'error'>('disconnected')
  const lastSyncTime = ref<Date | null>(null)

  const updateSyncStatus = (status: 'connected' | 'disconnected' | 'error') => {
    syncStatus.value = status
    if (status === 'connected') {
      lastSyncTime.value = new Date()
    }
  }

  return {
    syncStatus,
    lastSyncTime,
    updateSyncStatus
  }
}
