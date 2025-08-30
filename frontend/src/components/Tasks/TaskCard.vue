<template>
  <div
    class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group"
    @click="$emit('click')"
  >
    <!-- Priority Badge & Actions -->
    <div class="flex items-center justify-between mb-3">
      <span
        class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm"
        :class="getPriorityClasses(task.priority)"
      >
        <div :class="getPriorityDotClasses(task.priority)" class="w-2 h-2 rounded-full mr-2 shadow-sm"></div>
        {{ task.priority }}
      </span>
      <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div v-if="task.comments && task.comments.length > 0" class="flex items-center space-x-1">
          <ChatBubbleLeftIcon class="h-4 w-4 text-gray-400" />
          <span class="text-xs text-gray-500 font-medium">
            {{ task.comments.length }}
          </span>
        </div>
        <EllipsisHorizontalIcon class="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
      </div>
    </div>

    <!-- Task Title -->
    <h4 class="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
      {{ task.title }}
    </h4>

    <!-- Task Description -->
    <p v-if="task.description" class="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed">
      {{ task.description }}
    </p>

    <!-- Due Date with Enhanced Styling -->
    <div v-if="task.dueDate" class="flex items-center mb-4">
      <CalendarIcon class="h-4 w-4 mr-2" :class="getDueDateIconClasses(task.dueDate)" />
      <span
        class="text-xs font-medium"
        :class="getDueDateClasses(task.dueDate)"
      >
        {{ formatDueDate(task.dueDate) }}
      </span>
    </div>

    <!-- Assignee & Meta Information -->
    <div class="flex items-center justify-between">
      <div v-if="task.assignee" class="flex items-center">
        <div class="relative">
          <div class="h-7 w-7 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-xs font-semibold text-white shadow-sm">
            {{ task.assignee.name.charAt(0).toUpperCase() }}
          </div>
          <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
        </div>
        <span class="ml-2 text-xs text-gray-600 font-medium">
          {{ task.assignee.name }}
        </span>
      </div>
      <div v-else class="flex items-center text-xs text-gray-400">
        <UserIcon class="h-4 w-4 mr-1" />
        <span class="font-medium">Unassigned</span>
      </div>
      
      <!-- Created Date with Modern Styling -->
      <div class="flex items-center space-x-1">
        <ClockIcon class="h-3 w-3 text-gray-400" />
        <span class="text-xs text-gray-400 font-medium">
          {{ formatCreatedDate(task.createdAt) }}
        </span>
      </div>
    </div>

    <!-- Progress Indicator for In-Progress Tasks -->
    <div v-if="task.status === TaskStatus.IN_PROGRESS" class="mt-4">
      <div class="w-full bg-gray-200 rounded-full h-1.5">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all duration-500" 
             :style="{ width: getTaskProgress() + '%' }"></div>
      </div>
      <span class="text-xs text-gray-500 mt-1 block">{{ getTaskProgress() }}% complete</span>
    </div>

    <!-- Status Indicator -->
    <div class="absolute top-0 left-0 w-1 h-full rounded-l-xl" :class="getStatusIndicatorColor(task.status)"></div>
  </div>
</template>

<script setup lang="ts">
import { 
  CalendarIcon, 
  ChatBubbleLeftIcon, 
  UserIcon,
  ClockIcon,
  EllipsisHorizontalIcon
} from '@heroicons/vue/24/outline'
import { format, formatDistanceToNow, isBefore, startOfDay, differenceInDays } from 'date-fns'
import type { Task } from '@/types'
import { TaskPriority, TaskStatus } from '@/types'

defineProps<{
  task: Task
}>()

defineEmits<{
  click: []
}>()

function getPriorityClasses(priority: string) {
  switch (priority) {
    case TaskPriority.URGENT:
      return 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300'
    case TaskPriority.HIGH:
      return 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300'
    case TaskPriority.MEDIUM:
      return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300'
    case TaskPriority.LOW:
      return 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300'
    default:
      return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300'
  }
}

function getPriorityDotClasses(priority: string) {
  switch (priority) {
    case TaskPriority.URGENT:
      return 'bg-red-500'
    case TaskPriority.HIGH:
      return 'bg-orange-500'
    case TaskPriority.MEDIUM:
      return 'bg-yellow-500'
    case TaskPriority.LOW:
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

function getDueDateClasses(dueDate: string) {
  const due = new Date(dueDate)
  const today = startOfDay(new Date())
  const daysUntilDue = differenceInDays(due, today)
  
  if (daysUntilDue < 0) {
    return 'text-red-600 font-semibold'
  } else if (daysUntilDue === 0) {
    return 'text-orange-600 font-semibold'
  } else if (daysUntilDue <= 3) {
    return 'text-yellow-600 font-medium'
  } else {
    return 'text-gray-600'
  }
}

function getDueDateIconClasses(dueDate: string) {
  const due = new Date(dueDate)
  const today = startOfDay(new Date())
  const daysUntilDue = differenceInDays(due, today)
  
  if (daysUntilDue < 0) {
    return 'text-red-500'
  } else if (daysUntilDue === 0) {
    return 'text-orange-500'
  } else if (daysUntilDue <= 3) {
    return 'text-yellow-500'
  } else {
    return 'text-gray-400'
  }
}

function formatDueDate(dueDate: string) {
  const due = new Date(dueDate)
  const today = startOfDay(new Date())
  const daysUntilDue = differenceInDays(due, today)
  
  if (daysUntilDue < 0) {
    return `Overdue by ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) !== 1 ? 's' : ''}`
  } else if (daysUntilDue === 0) {
    return 'Due today'
  } else if (daysUntilDue === 1) {
    return 'Due tomorrow'
  } else if (daysUntilDue <= 7) {
    return `Due in ${daysUntilDue} days`
  } else {
    return `Due ${format(due, 'MMM d')}`
  }
}

function formatCreatedDate(createdAt: string) {
  return formatDistanceToNow(new Date(createdAt), { addSuffix: true })
}

function getStatusIndicatorColor(status: TaskStatus) {
  switch (status) {
    case TaskStatus.TODO:
      return 'bg-gray-400'
    case TaskStatus.IN_PROGRESS:
      return 'bg-blue-500'
    case TaskStatus.REVIEW:
      return 'bg-yellow-500'
    case TaskStatus.DONE:
      return 'bg-green-500'
    default:
      return 'bg-gray-400'
  }
}

function getTaskProgress() {
  // Mock progress calculation - in real app, this could be based on subtasks, comments, etc.
  return Math.floor(Math.random() * 70) + 20 // 20-90% progress
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Enhanced hover effects */
.group:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, transform, box-shadow, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>
