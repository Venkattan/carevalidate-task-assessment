<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Navigation Header -->
    <nav v-if="isAuthenticated" class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-900">TaskFlow</h1>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                to="/dashboard"
                class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                active-class="border-blue-500 text-gray-900"
              >
                Dashboard
              </router-link>
              <router-link
                to="/projects"
                class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                active-class="border-blue-500 text-gray-900"
              >
                Projects
              </router-link>
            </div>
          </div>
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <span class="text-sm text-gray-700">{{ currentUser?.name }}</span>
            </div>
            <div class="ml-4 flex-shrink-0">
              <button
                @click="handleLogout"
                class="bg-white p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Loading Indicator -->
    <div v-if="isLoading.auth" class="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Notifications -->
    <NotificationList />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { ME_QUERY } from '@/apollo/queries'
import { currentUser, isAuthenticated, isLoading, logout, setCurrentUser, setLoading } from '@/store'
import NotificationList from '@/components/Notifications/NotificationList.vue'

const router = useRouter()

// Check authentication on app start
onMounted(async () => {
  const token = localStorage.getItem('access_token')
  if (token) {
    setLoading('auth', true)
    
    // Try to get current user info
    const { result, error } = useQuery(ME_QUERY, {}, {
      errorPolicy: 'all'
    })
    
    if (result.value?.me) {
      setCurrentUser(result.value.me)
    } else if (error.value) {
      // Token is invalid, clear it
      localStorage.removeItem('access_token')
      await router.push('/login')
    }
    
    setLoading('auth', false)
  } else if (router.currentRoute.value.meta.requiresAuth !== false) {
    await router.push('/login')
  }
})

const handleLogout = async () => {
  logout()
  await router.push('/login')
}
</script>

<style>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Transitions */
.router-link-exact-active {
  @apply border-blue-500 text-gray-900;
}

/* Animation classes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
