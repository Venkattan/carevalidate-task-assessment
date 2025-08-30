<template>
  <teleport to="body">
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              Create New Project
            </h3>
            <button
              @click="$emit('close')"
              class="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon class="h-6 w-6" />
            </button>
          </div>
          
          <form @submit.prevent="handleCreate">
            <div class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter project name"
                />
              </div>
              
              <div>
                <label for="description" class="block text-sm font-medium text-gray-700">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  v-model="form.description"
                  rows="3"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Describe your project"
                ></textarea>
              </div>
            </div>

            <div v-if="error" class="mt-4 rounded-md bg-red-50 p-4">
              <div class="flex">
                <ExclamationTriangleIcon class="h-5 w-5 text-red-400" />
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800">
                    Error creating project
                  </h3>
                  <div class="mt-2 text-sm text-red-700">
                    {{ error }}
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                @click="$emit('close')"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading || !form.name.trim()"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading" class="flex items-center">
                  <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </span>
                <span v-else>Create Project</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { CREATE_PROJECT_MUTATION } from '@/apollo/queries'
import type { CreateProjectInput, Project } from '@/types'

const emit = defineEmits<{
  close: []
  created: [project: Project]
}>()

const form = ref<CreateProjectInput>({
  name: '',
  description: ''
})

const error = ref('')
const loading = ref(false)

const { mutate: createProject } = useMutation(CREATE_PROJECT_MUTATION)

const handleCreate = async () => {
  if (!form.value.name.trim()) {
    error.value = 'Project name is required'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const result = await createProject({
      input: {
        name: form.value.name.trim(),
        description: form.value.description?.trim() || undefined
      }
    })

    if (result?.data?.createProject) {
      emit('created', result.data.createProject)
    }
  } catch (err: any) {
    error.value = err.message || 'Failed to create project'
  } finally {
    loading.value = false
  }
}
</script>
