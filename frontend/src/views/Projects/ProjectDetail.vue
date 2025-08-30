<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <!-- Loading State -->
    <div v-if="isLoading.projects" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <!-- Project Header -->
    <div v-else-if="currentProject" class="px-4 py-6 sm:px-0">
      <nav class="flex mb-4" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-4">
          <li>
            <router-link to="/projects" class="text-gray-400 hover:text-gray-500">
              Projects
            </router-link>
          </li>
          <li>
            <ChevronRightIcon class="h-5 w-5 text-gray-400" />
          </li>
          <li>
            <span class="text-gray-500">{{ currentProject.name }}</span>
          </li>
        </ol>
      </nav>

      <div class="bg-white shadow rounded-lg p-6 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">{{ currentProject.name }}</h1>
            <p v-if="currentProject.description" class="mt-2 text-gray-600">
              {{ currentProject.description }}
            </p>
            <p v-else class="mt-2 text-gray-400 italic">No description provided</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-500">
              <UsersIcon class="h-4 w-4 inline mr-1" />
              {{ currentProject.members.length }} member{{ currentProject.members.length !== 1 ? 's' : '' }}
            </div>
            <div class="text-sm text-gray-500">
              <ClipboardDocumentListIcon class="h-4 w-4 inline mr-1" />
              {{ tasks.length }} task{{ tasks.length !== 1 ? 's' : '' }}
            </div>
          </div>
        </div>

        <!-- Project Members -->
        <div class="mt-4 flex items-center space-x-2">
          <span class="text-sm font-medium text-gray-700">Team:</span>
          <div class="flex -space-x-1">
            <div
              v-for="member in currentProject.members"
              :key="member.id"
              class="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700"
              :title="member.name"
            >
              {{ member.name.charAt(0).toUpperCase() }}
            </div>
          </div>
        </div>
      </div>

      <!-- Task Board Component -->
      <TaskBoard :project-id="id" />
    </div>

    <!-- Error State -->
    <div v-else class="px-4 py-6 sm:px-0">
      <div class="text-center py-12">
        <ExclamationTriangleIcon class="mx-auto h-12 w-12 text-red-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">Project not found</h3>
        <p class="mt-1 text-sm text-gray-500">
          The project you're looking for doesn't exist or you don't have access to it.
        </p>
        <div class="mt-6">
          <router-link
            to="/projects"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Projects
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { 
  ChevronRightIcon, 
  UsersIcon, 
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon 
} from '@heroicons/vue/24/outline'
import { GET_PROJECT_QUERY } from '@/apollo/queries'
import { 
  currentProject, 
  tasks, 
  isLoading, 
  setCurrentProject, 
  setLoading, 
  addNotification 
} from '@/store'
import TaskBoard from '@/views/Tasks/TaskBoard.vue'

const props = defineProps<{
  id: string
}>()

// Fetch project data
const { result: projectResult, loading: projectLoading, error: projectError } = useQuery(
  GET_PROJECT_QUERY, 
  { id: props.id }
)

// Watch for project data
watch(projectResult, (data) => {
  if (data?.project) {
    setCurrentProject(data.project)
  }
}, { immediate: true })

// Watch for loading state
watch(projectLoading, (loading) => {
  setLoading('projects', loading)
})

// Watch for errors
watch(projectError, (error) => {
  if (error) {
    addNotification({
      type: 'error',
      title: 'Failed to load project',
      message: error.message
    })
  }
})

// Watch for project changes (when navigating between projects)
watch(() => props.id, () => {
  // Apollo will automatically refetch when variables change
  setCurrentProject(null)
})
</script>
