import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/store'

// Lazy load components
const Login = () => import('@/views/Auth/Login.vue')
const Register = () => import('@/views/Auth/Register.vue')
const Dashboard = () => import('@/views/Dashboard.vue')
const Projects = () => import('@/views/Projects/ProjectList.vue')
const ProjectDetail = () => import('@/views/Projects/ProjectDetail.vue')
const TaskBoard = () => import('@/views/Tasks/TaskBoard.vue')
const TaskDetail = () => import('@/views/Tasks/TaskDetail.vue')

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta: { requiresAuth: true }
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: ProjectDetail,
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/projects/:projectId/tasks',
    name: 'TaskBoard',
    component: TaskBoard,
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/tasks/:id',
    name: 'TaskDetail',
    component: TaskDetail,
    meta: { requiresAuth: true },
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if (requiresAuth && !isAuthenticated.value) {
    next('/login')
  } else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated.value) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
