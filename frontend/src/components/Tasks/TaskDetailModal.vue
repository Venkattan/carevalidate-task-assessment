<template>
  <teleport to="body">
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-medium text-gray-900">
              Task Details
            </h3>
            <div class="flex items-center space-x-2">
              <button
                @click="toggleEdit"
                class="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {{ isEditing ? 'Cancel' : 'Edit' }}
              </button>
              <button
                @click="handleDelete"
                class="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Delete
              </button>
              <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
                <XMarkIcon class="h-6 w-6" />
              </button>
            </div>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Main Content -->
            <div class="lg:col-span-2">
              <div v-if="!isEditing" class="space-y-4">
                <div>
                  <h2 class="text-2xl font-semibold text-gray-900">{{ task.title }}</h2>
                  <p v-if="task.description" class="mt-2 text-gray-600 whitespace-pre-wrap">
                    {{ task.description }}
                  </p>
                  <p v-else class="mt-2 text-gray-400 italic">No description provided</p>
                </div>

                <!-- Task Metadata -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div class="flex items-center">
                      <span class="font-medium text-gray-700 mr-2">Status:</span>
                      <span :class="getStatusColor(task.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                        {{ getStatusLabel(task.status) }}
                      </span>
                    </div>
                    <div class="flex items-center">
                      <span class="font-medium text-gray-700 mr-2">Priority:</span>
                      <span :class="getPriorityColor(task.priority)" class="px-2 py-1 rounded-full text-xs font-medium">
                        {{ task.priority }}
                      </span>
                    </div>
                    <div v-if="task.assignee">
                      <span class="font-medium text-gray-700">Assigned to:</span>
                      <span class="ml-2">{{ task.assignee.name }}</span>
                    </div>
                    <div v-if="task.dueDate">
                      <span class="font-medium text-gray-700">Due Date:</span>
                      <span class="ml-2">{{ formatDate(task.dueDate) }}</span>
                    </div>
                    <div>
                      <span class="font-medium text-gray-700">Created:</span>
                      <span class="ml-2">{{ formatDate(task.createdAt) }}</span>
                    </div>
                    <div>
                      <span class="font-medium text-gray-700">Creator:</span>
                      <span class="ml-2">{{ task.creator.name }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Edit Form -->
              <div v-else class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    v-model="editForm.title"
                    type="text"
                    required
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    v-model="editForm.description"
                    rows="4"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  ></textarea>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Priority</label>
                    <select
                      v-model="editForm.priority"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                      <option value="URGENT">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      v-model="editForm.status"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="TODO">To Do</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="REVIEW">Review</option>
                      <option value="DONE">Done</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Due Date</label>
                  <input
                    v-model="editForm.dueDate"
                    type="date"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div v-if="updateError" class="rounded-md bg-red-50 p-4">
                  <div class="text-sm text-red-700">{{ updateError }}</div>
                </div>

                <div class="flex justify-end space-x-3">
                  <button
                    type="button"
                    @click="toggleEdit"
                    class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    @click="handleUpdate"
                    :disabled="updateLoading || !editForm.title.trim()"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    {{ updateLoading ? 'Saving...' : 'Save Changes' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Comments Section -->
            <div class="lg:col-span-1">
              <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 h-full border border-gray-200">
                <div class="flex items-center justify-between mb-4">
                  <h4 class="text-lg font-semibold text-gray-900">Comments</h4>
                  <!-- Real-time indicator -->
                  <div class="flex items-center space-x-2">
                    <div 
                      :class="[
                        'w-2 h-2 rounded-full transition-all duration-300',
                        isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                      ]"
                    ></div>
                    <SparklesIcon v-if="isConnected" class="h-4 w-4 text-green-500" />
                  </div>
                </div>
                
                <!-- Comment List -->
                <div class="space-y-3 mb-4 max-h-96 overflow-y-auto">
                  <div
                    v-for="comment in taskComments"
                    :key="comment.id"
                    class="bg-white rounded-lg p-3 shadow-sm"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-medium text-gray-900">
                        {{ comment.author.name }}
                      </span>
                      <span class="text-xs text-gray-500">
                        {{ formatDate(comment.createdAt) }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-700 whitespace-pre-wrap">{{ comment.content }}</p>
                  </div>
                  
                  <div v-if="taskComments.length === 0" class="text-center py-4">
                    <p class="text-sm text-gray-500">No comments yet</p>
                  </div>
                </div>

                <!-- Add Comment Form -->
                <div class="space-y-3">
                  <textarea
                    v-model="newComment"
                    placeholder="Add a comment..."
                    rows="3"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  ></textarea>
                  <button
                    @click="handleAddComment"
                    :disabled="commentLoading || !newComment.trim()"
                    class="w-full px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    {{ commentLoading ? 'Adding...' : 'Add Comment' }}
                  </button>
                  
                  <div v-if="commentError" class="rounded-md bg-red-50 p-2">
                    <div class="text-xs text-red-700">{{ commentError }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { XMarkIcon, SparklesIcon } from '@heroicons/vue/24/outline'
import { format } from 'date-fns'
import { 
  UPDATE_TASK_MUTATION, 
  DELETE_TASK_MUTATION, 
  ADD_COMMENT_MUTATION,
  GET_TASK_QUERY
} from '@/apollo/queries'
import { addNotification } from '@/store'
import { TaskStatus, TaskPriority } from '@/types'
import type { Task, Comment, UpdateTaskInput } from '@/types'
import { useRealTimeUpdates } from '@/composables/useRealTimeUpdates'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  close: []
  updated: [task: Task]
  deleted: [taskId: string]
}>()

const isEditing = ref(false)
const updateLoading = ref(false)
const updateError = ref('')
const commentLoading = ref(false)
const commentError = ref('')
const newComment = ref('')

// Initialize real-time updates for comments
const { isConnected } = useRealTimeUpdates(undefined, props.task.id)

// Edit form
const editForm = ref<UpdateTaskInput>({
  title: props.task.title,
  description: props.task.description || '',
  status: props.task.status,
  priority: props.task.priority,
  dueDate: props.task.dueDate || ''
})

// Fetch full task details with comments
const { result: taskResult, refetch: refetchTask } = useQuery(GET_TASK_QUERY, { id: props.task.id })

const taskComments = computed(() => {
  return taskResult.value?.task?.comments || []
})

const { mutate: updateTask } = useMutation(UPDATE_TASK_MUTATION)
const { mutate: deleteTask } = useMutation(DELETE_TASK_MUTATION)
const { mutate: addComment } = useMutation(ADD_COMMENT_MUTATION)

const toggleEdit = () => {
  isEditing.value = !isEditing.value
  if (isEditing.value) {
    // Reset form to current task values
    editForm.value = {
      title: props.task.title,
      description: props.task.description || '',
      status: props.task.status,
      priority: props.task.priority,
      dueDate: props.task.dueDate || ''
    }
    updateError.value = ''
  }
}

const handleUpdate = async () => {
  updateLoading.value = true
  updateError.value = ''

  try {
    const input = { ...editForm.value }
    if (!input.dueDate) delete input.dueDate
    if (!input.description) delete input.description

    const result = await updateTask({ 
      id: props.task.id, 
      input 
    })

    if (result?.data?.updateTask) {
      emit('updated', result.data.updateTask)
      isEditing.value = false
    }
  } catch (err: any) {
    updateError.value = err.message || 'Failed to update task'
  } finally {
    updateLoading.value = false
  }
}

const handleDelete = async () => {
  if (!confirm('Are you sure you want to delete this task?')) return

  try {
    await deleteTask({ id: props.task.id })
    emit('deleted', props.task.id)
  } catch (err: any) {
    addNotification({
      type: 'error',
      title: 'Failed to delete task',
      message: err.message
    })
  }
}

const handleAddComment = async () => {
  if (!newComment.value.trim()) return

  commentLoading.value = true
  commentError.value = ''

  try {
    const result = await addComment({
      taskId: props.task.id,
      content: newComment.value.trim()
    })

    if (result?.data?.addComment) {
      newComment.value = ''
      // Refetch task to get updated comments
      await refetchTask()
      addNotification({
        type: 'success',
        title: 'Comment added',
        message: 'Your comment has been added'
      })
    }
  } catch (err: any) {
    commentError.value = err.message || 'Failed to add comment'
  } finally {
    commentLoading.value = false
  }
}

const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'MMM d, yyyy h:mm a')
}

const getStatusLabel = (status: TaskStatus) => {
  const labels = {
    [TaskStatus.TODO]: 'To Do',
    [TaskStatus.IN_PROGRESS]: 'In Progress',
    [TaskStatus.REVIEW]: 'Review',
    [TaskStatus.DONE]: 'Done'
  }
  return labels[status] || status
}

const getStatusColor = (status: TaskStatus) => {
  const colors = {
    [TaskStatus.TODO]: 'bg-gray-100 text-gray-800',
    [TaskStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
    [TaskStatus.REVIEW]: 'bg-yellow-100 text-yellow-800',
    [TaskStatus.DONE]: 'bg-green-100 text-green-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const getPriorityColor = (priority: TaskPriority) => {
  const colors = {
    [TaskPriority.LOW]: 'bg-green-100 text-green-800',
    [TaskPriority.MEDIUM]: 'bg-yellow-100 text-yellow-800',
    [TaskPriority.HIGH]: 'bg-orange-100 text-orange-800',
    [TaskPriority.URGENT]: 'bg-red-100 text-red-800'
  }
  return colors[priority] || 'bg-gray-100 text-gray-800'
}

// Watch for task changes
watch(() => props.task, (newTask) => {
  editForm.value = {
    title: newTask.title,
    description: newTask.description || '',
    status: newTask.status,
    priority: newTask.priority,
    dueDate: newTask.dueDate || ''
  }
}, { deep: true })
</script>
