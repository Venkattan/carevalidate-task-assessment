<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="px-4 py-6 sm:px-0">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Projects</h1>
          <p class="mt-2 text-gray-600">
            Manage your team projects and collaborate effectively.
          </p>
        </div>
        <button
          @click="showCreateModal = true"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon class="-ml-1 mr-2 h-5 w-5" />
          New Project
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading.projects" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <!-- Projects Grid -->
    <div v-else-if="projects.length > 0" class="px-4 py-6 sm:px-0">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="project in projects"
          :key="project.id"
          class="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow cursor-pointer"
          @click="$router.push(`/projects/${project.id}`)"
        >
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-lg bg-blue-500 flex items-center justify-center">
                  <span class="text-white font-medium text-lg">
                    {{ project.name.charAt(0).toUpperCase() }}
                  </span>
                </div>
              </div>
              <div class="ml-4 flex-1">
                <h3 class="text-lg font-medium text-gray-900 truncate">
                  {{ project.name }}
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                  {{ formatDate(project.createdAt) }}
                </p>
              </div>
            </div>
            
            <div class="mt-4">
              <p class="text-gray-600 text-sm line-clamp-2">
                {{ project.description || 'No description available' }}
              </p>
            </div>

            <div class="mt-4 flex items-center justify-between">
              <div class="flex items-center text-sm text-gray-500">
                <UsersIcon class="h-4 w-4 mr-1" />
                {{ project.members.length }} member{{ project.members.length !== 1 ? 's' : '' }}
              </div>
              <div class="flex items-center text-sm text-gray-500">
                <ClipboardDocumentListIcon class="h-4 w-4 mr-1" />
                {{ project.tasks?.length || 0 }} task{{ (project.tasks?.length || 0) !== 1 ? 's' : '' }}
              </div>
            </div>

            <!-- Members Avatar Stack -->
            <div class="mt-4 flex -space-x-1 overflow-hidden">
              <div
                v-for="(member, index) in project.members.slice(0, 4)"
                :key="member.id"
                class="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-700"
                :title="member.name"
              >
                {{ member.name.charAt(0).toUpperCase() }}
              </div>
              <div
                v-if="project.members.length > 4"
                class="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500"
              >
                +{{ project.members.length - 4 }}
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 px-6 py-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">
                View Details
              </span>
              <ChevronRightIcon class="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="px-4 py-6 sm:px-0">
      <div class="text-center py-12">
        <FolderIcon class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No projects</h3>
        <p class="mt-1 text-sm text-gray-500">
          Get started by creating your first project.
        </p>
        <div class="mt-6">
          <button
            @click="showCreateModal = true"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon class="-ml-1 mr-2 h-5 w-5" />
            Create your first project
          </button>
        </div>
      </div>
    </div>

    <!-- Create Project Modal -->
    <CreateProjectModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @created="handleProjectCreated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import {
  PlusIcon,
  FolderIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'
import { format } from 'date-fns'
import { GET_PROJECTS_QUERY } from '@/apollo/queries'
import { projects, isLoading, setProjects, setLoading, addNotification, addProject } from '@/store'
import CreateProjectModal from '@/components/Projects/CreateProjectModal.vue'
import type { Project } from '@/types'

const showCreateModal = ref(false)

// Fetch projects using Apollo composable
const { result: projectsResult, loading: projectsLoading, error: projectsError } = useQuery(GET_PROJECTS_QUERY)

// Watch for projects data and update store
watch(projectsResult, (data) => {
  if (data?.projects) {
    setProjects(data.projects)
  }
}, { immediate: true })

// Watch for loading state
watch(projectsLoading, (loading) => {
  setLoading('projects', loading)
})

// Watch for errors
watch(projectsError, (error) => {
  if (error) {
    addNotification({
      type: 'error',
      title: 'Failed to load projects',
      message: error.message
    })
  }
})

const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'MMM d, yyyy')
}

const handleProjectCreated = (project: Project) => {
  addProject(project)
  showCreateModal.value = false
  addNotification({
    type: 'success',
    title: 'Project created',
    message: `${project.name} has been created successfully`
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
