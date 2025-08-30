<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:          <!-- Always Visible Add Task Button -->
          <button
            @click="showCreateTaskModal = true"
            class="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
          >
            <PlusIcon class="-ml-1 mr-2 h-5 w-5" />
            Add Task
          </button>  <!-- Header with Real-time Status -->
    <div class="px-4 py-6 sm:px-0 bg-white rounded-lg shadow-sm mb-6">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-4">
              <li>
                <router-link to="/projects" class="text-gray-400 hover:text-gray-500 transition-colors">
                  Projects
                </router-link>
              </li>
              <li>
                <ChevronRightIcon class="h-5 w-5 text-gray-400" />
              </li>
              <li>
                <span class="text-gray-500">{{ currentProject?.name || 'Loading...' }}</span>
              </li>
            </ol>
          </nav>
          <div class="flex items-center space-x-4 mt-2">
            <h1 class="text-3xl font-bold text-gray-900">Task Board</h1>
            <!-- Real-time Connection Status -->
            <div class="flex items-center space-x-2">
              <div 
                :class="[
                  'w-2 h-2 rounded-full transition-all duration-300',
                  isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                ]"
              ></div>
              <span class="text-xs text-gray-500">
                {{ isConnected ? 'Live' : 'Offline' }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Right side controls -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <!-- Task Stats -->
          <div class="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <div class="flex items-center space-x-1">
              <div class="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span>{{ todoTasks.length }} To Do</span>
            </div>
            <div class="flex items-center space-x-1">
              <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>{{ inProgressTasks.length }} In Progress</span>
            </div>
            <div class="flex items-center space-x-1">
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>{{ reviewTasks.length }} Review</span>
            </div>
            <div class="flex items-center space-x-1">
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>{{ doneTasks.length }} Done</span>
            </div>
          </div>
          <!-- Always Visible Add Task Button with Fixed Styling -->
          <button
            @click="handleAddTaskClick"
            class="flex-shrink-0 inline-flex items-center justify-center px-6 py-3 border-0 shadow-lg text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            style="min-width: 120px; background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);"
          >
            <PlusIcon class="w-5 h-5 mr-2" />
            Add Task
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading.tasks" class="flex justify-center py-12">
      <div class="relative">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div class="absolute inset-0 animate-ping rounded-full h-12 w-12 border-2 border-blue-400 opacity-20"></div>
      </div>
    </div>

    <!-- Modern Kanban Board -->
    <div v-else class="px-4 py-6 sm:px-0">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <!-- TODO Column -->
        <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-sm font-semibold text-gray-900 flex items-center">
              <div class="w-3 h-3 bg-gray-400 rounded-full mr-3 shadow-sm"></div>
              To Do
              <span class="ml-3 bg-gray-200 text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium">
                {{ todoTasks.length }}
              </span>
            </h3>
            <EllipsisVerticalIcon class="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
          </div>
          <div class="space-y-4 min-h-[200px]">
            <TransitionGroup
              name="task-list"
              tag="div"
              class="space-y-4"
            >
              <TaskCard
                v-for="task in todoTasks"
                :key="task.id"
                :task="task"
                @click="selectTask(task)"
                class="animate-slide-in"
              />
            </TransitionGroup>
            <div v-if="todoTasks.length === 0" class="flex flex-col items-center justify-center py-8 text-gray-400">
              <ClipboardDocumentListIcon class="h-8 w-8 mb-2" />
              <span class="text-sm">No tasks yet</span>
            </div>
          </div>
        </div>

        <!-- IN_PROGRESS Column -->
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-sm font-semibold text-gray-900 flex items-center">
              <div class="w-3 h-3 bg-blue-500 rounded-full mr-3 shadow-sm"></div>
              In Progress
              <span class="ml-3 bg-blue-200 text-blue-800 text-xs px-2.5 py-1 rounded-full font-medium">
                {{ inProgressTasks.length }}
              </span>
            </h3>
            <EllipsisVerticalIcon class="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
          </div>
          <div class="space-y-4 min-h-[200px]">
            <TransitionGroup
              name="task-list"
              tag="div"
              class="space-y-4"
            >
              <TaskCard
                v-for="task in inProgressTasks"
                :key="task.id"
                :task="task"
                @click="selectTask(task)"
                class="animate-slide-in"
              />
            </TransitionGroup>
            <div v-if="inProgressTasks.length === 0" class="flex flex-col items-center justify-center py-8 text-gray-400">
              <PlayIcon class="h-8 w-8 mb-2" />
              <span class="text-sm">No active tasks</span>
            </div>
          </div>
        </div>

        <!-- REVIEW Column -->
        <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-sm font-semibold text-gray-900 flex items-center">
              <div class="w-3 h-3 bg-yellow-500 rounded-full mr-3 shadow-sm"></div>
              Review
              <span class="ml-3 bg-yellow-200 text-yellow-800 text-xs px-2.5 py-1 rounded-full font-medium">
                {{ reviewTasks.length }}
              </span>
            </h3>
            <EllipsisVerticalIcon class="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
          </div>
          <div class="space-y-4 min-h-[200px]">
            <TransitionGroup
              name="task-list"
              tag="div"
              class="space-y-4"
            >
              <TaskCard
                v-for="task in reviewTasks"
                :key="task.id"
                :task="task"
                @click="selectTask(task)"
                class="animate-slide-in"
              />
            </TransitionGroup>
            <div v-if="reviewTasks.length === 0" class="flex flex-col items-center justify-center py-8 text-gray-400">
              <EyeIcon class="h-8 w-8 mb-2" />
              <span class="text-sm">No tasks in review</span>
            </div>
          </div>
        </div>

        <!-- DONE Column -->
        <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-sm font-semibold text-gray-900 flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-3 shadow-sm"></div>
              Done
              <span class="ml-3 bg-green-200 text-green-800 text-xs px-2.5 py-1 rounded-full font-medium">
                {{ doneTasks.length }}
              </span>
            </h3>
            <EllipsisVerticalIcon class="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
          </div>
          <div class="space-y-4 min-h-[200px]">
            <TransitionGroup
              name="task-list"
              tag="div"
              class="space-y-4"
            >
              <TaskCard
                v-for="task in doneTasks"
                :key="task.id"
                :task="task"
                @click="selectTask(task)"
                class="animate-slide-in"
              />
            </TransitionGroup>
            <div v-if="doneTasks.length === 0" class="flex flex-col items-center justify-center py-8 text-gray-400">
              <CheckCircleIcon class="h-8 w-8 mb-2" />
              <span class="text-sm">No completed tasks</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Real-time Toast Notifications Area -->
    <div class="fixed bottom-4 right-4 z-50 space-y-2">
      <Transition
        v-for="notification in recentNotifications"
        :key="notification.id"
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="transform translate-x-full opacity-0"
        enter-to-class="transform translate-x-0 opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="transform translate-x-0 opacity-100"
        leave-to-class="transform translate-x-full opacity-0"
      >
        <div class="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ notification.message }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Modals -->
    <CreateTaskModal
      v-if="showCreateTaskModal"
      :project-id="projectId"
      @close="showCreateTaskModal = false"
      @created="handleTaskCreated"
    />

    <TaskDetailModal
      v-if="selectedTask"
      :task="selectedTask"
      @close="selectedTask = null"
      @updated="handleTaskUpdated"
      @deleted="handleTaskDeleted"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { 
  ChevronRightIcon, 
  PlusIcon, 
  EllipsisVerticalIcon,
  ClipboardDocumentListIcon,
  PlayIcon,
  EyeIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'
import { 
  GET_TASKS_QUERY, 
  GET_PROJECT_QUERY
} from '@/apollo/queries'
import { 
  tasks, 
  currentProject, 
  isLoading, 
  notifications,
  setTasks, 
  setCurrentProject, 
  setLoading, 
  addNotification,
  addTask,
  updateTask,
  removeTask
} from '@/store'
import { TaskStatus } from '@/types'
import type { Task } from '@/types'
import TaskCard from '@/components/Tasks/TaskCard.vue'
import CreateTaskModal from '@/components/Tasks/CreateTaskModal.vue'
import TaskDetailModal from '@/components/Tasks/TaskDetailModal.vue'
import { useRealTimeUpdates } from '@/composables/useRealTimeUpdates'

const props = defineProps<{
  projectId: string
}>()

const showCreateTaskModal = ref(false)
const selectedTask = ref<Task | null>(null)

// Initialize real-time updates
const { isConnected, connectionError, addUserAction } = useRealTimeUpdates(props.projectId)

// Fetch project
const { result: projectResult, loading: projectLoading, error: projectError } = useQuery(
  GET_PROJECT_QUERY, 
  { id: props.projectId }
)

// Fetch tasks
const { result: tasksResult, loading: tasksLoading, error: tasksError } = useQuery(
  GET_TASKS_QUERY,
  { projectId: props.projectId, limit: 100 }
)

// Watch for project data
watch(projectResult, (data) => {
  if (data?.project) {
    setCurrentProject(data.project)
  }
}, { immediate: true })

// Watch for tasks data
watch(tasksResult, (data) => {
  if (data?.tasks?.edges) {
    setTasks(data.tasks.edges.map((edge: any) => edge.node))
  }
}, { immediate: true })

// Watch for loading states
watch(tasksLoading, (loading) => {
  setLoading('tasks', loading)
})

// Watch for errors
watch([projectError, tasksError], ([pError, tError]) => {
  if (pError) {
    addNotification({
      type: 'error',
      title: 'Failed to load project',
      message: pError.message
    })
  }
  if (tError) {
    addNotification({
      type: 'error',
      title: 'Failed to load tasks',
      message: tError.message
    })
  }
})

// Watch for connection errors
watch(connectionError, (error) => {
  if (error) {
    addNotification({
      type: 'warning',
      title: 'Connection Issue',
      message: error
    })
  }
})

// Task organization by status with enhanced animations
const todoTasks = computed(() => 
  tasks.value.filter(task => task.status === TaskStatus.TODO)
)
const inProgressTasks = computed(() => 
  tasks.value.filter(task => task.status === TaskStatus.IN_PROGRESS)
)
const reviewTasks = computed(() => 
  tasks.value.filter(task => task.status === TaskStatus.REVIEW)
)
const doneTasks = computed(() => 
  tasks.value.filter(task => task.status === TaskStatus.DONE)
)

// Recent notifications for real-time toast display
const recentNotifications = computed(() => {
  return notifications.value
    .filter(n => n.type === 'info')
    .slice(-3) // Show only last 3 real-time notifications
})

const selectTask = (task: Task) => {
  selectedTask.value = task
}

const handleTaskCreated = (task: Task) => {
  // Track this as a user action to prevent duplicate notifications
  addUserAction(`task-created-${task.id}`)
  
  addTask(task)
  showCreateTaskModal.value = false
  addNotification({
    type: 'success',
    title: 'Task created',
    message: `"${task.title}" has been created successfully`
  })
}

const handleTaskUpdated = (task: Task) => {
  // Track this as a user action to prevent duplicate notifications
  addUserAction(`task-updated-${task.id}`)
  
  updateTask(task)
  selectedTask.value = task
  addNotification({
    type: 'success',
    title: 'Task updated',
    message: `"${task.title}" has been updated`
  })
}

const handleTaskDeleted = (taskId: string) => {
  // Track this as a user action to prevent duplicate notifications
  addUserAction(`task-deleted-${taskId}`)
  
  removeTask(taskId)
  selectedTask.value = null
  addNotification({
    type: 'success',
    title: 'Task deleted',
    message: 'Task has been deleted successfully'
  })
}

// Watch for project changes
watch(() => props.projectId, () => {
  // Apollo will automatically refetch when variables change
  setCurrentProject(null)
  setTasks([])
})

// Cleanup on unmount
onUnmounted(() => {
  setCurrentProject(null)
  setTasks([])
})
</script>

<style scoped>
/* Custom animations for modern UI */
.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Task list transitions */
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.3s ease;
}

.task-list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.task-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.task-list-move {
  transition: transform 0.3s ease;
}

/* Gradient hover effects */
.bg-gradient-to-br:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

/* Loading animation enhancement */
@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
