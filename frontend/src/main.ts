import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from '@/apollo/client'
import router from '@/router'
import App from './App.vue'
import './style.css'

// Check if user is already logged in
const token = localStorage.getItem('access_token')
if (token) {
  // You might want to validate the token here
  // For now, we'll let the components handle authentication state
}

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(router)
app.mount('#app')
