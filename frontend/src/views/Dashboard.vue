<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <!-- Welcome Header -->
    <div class="px-4 py-6 sm:px-0">
      <h1 class="text-3xl font-bold text-gray-900">
        Welcome back, {{ currentUser?.name }}!
      </h1>
      <p class="mt-2 text-gray-600">
        Here's what's happening with your projects and tasks.
      </p>
    </div>

    <!-- Quick Stats -->
    <div class="px-4 py-6 sm:px-0">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <FolderIcon class="h-6 w-6 text-gray-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total Projects
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ projects.length }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-5 py-3">
            <div class="text-sm">
              <router-link to="/projects" class="font-medium text-blue-700 hover:text-blue-900">
                View all
              </router-link>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <ClipboardDocumentListIcon class="h-6 w-6 text-gray-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Active Tasks
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ activeTasks }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-5 py-3">
            <div class="text-sm">
              <span class="font-medium text-gray-700">
                {{ completedTasks }} completed
              </span>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <ExclamationTriangleIcon class="h-6 w-6 text-red-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Urgent Tasks
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ urgentTasks }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-5 py-3">
            <div class="text-sm">
              <span class="font-medium text-red-700">
                Needs attention
              </span>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <UsersIcon class="h-6 w-6 text-gray-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Team Members
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ totalMembers }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-5 py-3">
            <div class="text-sm">
              <span class="font-medium text-gray-700">
                Across all projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Projects -->
    <div class="px-4 py-6 sm:px-0">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Projects
          </h3>
          <div v-if="projects.length === 0" class="text-center py-8">
            <FolderIcon class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-2 text-sm font-medium text-gray-900">No projects yet</h3>
            <p class="mt-1 text-sm text-gray-500">
              Get started by creating your first project.
            </p>
            <div class="mt-6">
              <router-link
                to="/projects"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon class="-ml-1 mr-2 h-5 w-5" />
                Create Project
              </router-link>
            </div>
          </div>
          <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="project in recentProjects"
              :key="project.id"
              class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              @click="$router.push(`/projects/${project.id}`)"
            >
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center">
                    <span class="text-white font-medium text-sm">
                      {{ project.name.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900">
                    {{ project.name }}
                  </p>
                  <p class="text-sm text-gray-500 truncate">
                    {{ project.description || 'No description' }}
                  </p>
                  <p class="text-xs text-gray-400 mt-1">
                    {{ project.members.length }} member{{ project.members.length !== 1 ? 's' : '' }}
                  </p>
                </div>
                <ChevronRightIcon class="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import {
  FolderIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  UsersIcon,
  PlusIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'
import { GET_PROJECTS_QUERY } from '@/apollo/queries'
import { currentUser, projects, setProjects, tasks, setLoading, addNotification } from '@/store'
import { TaskStatus, TaskPriority } from '@/types'

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

// Computed properties for dashboard stats
const recentProjects = computed(() => {
  return projects.value.slice(0, 6)
})

const activeTasks = computed(() => {
  return tasks.value.filter(task => 
    task.status !== TaskStatus.DONE
  ).length
})

const completedTasks = computed(() => {
  return tasks.value.filter(task => 
    task.status === TaskStatus.DONE
  ).length
})

const urgentTasks = computed(() => {
  return tasks.value.filter(task => 
    task.priority === TaskPriority.URGENT && task.status !== TaskStatus.DONE
  ).length
})

const totalMembers = computed(() => {
  const memberIds = new Set()
  projects.value.forEach(project => {
    project.members.forEach(member => {
      memberIds.add(member.id)
    })
  })
  return memberIds.size
})
</script>
