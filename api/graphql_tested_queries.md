mutation Register {
  register(input: {
    email: "test1@example.com"
    password: "password123"
    name: "Test User"
  }) {
    access_token
    user {
      id
      name
      email
    }
  }
}


mutation CreateProject {
  createProject(input: {
    name: "Performance Test Project"
    description: "Testing SQL optimizations"
  }) {
    id
    name
    description
  }
}

# d2413554-5f89-4343-8b88-a8c9a8dd0f21

mutation CreateTask {
  createTask(input: {
    title: "First Task"
    description: "Testing first task database "
    status: TODO
    priority: HIGH
    projectId: "d2413554-5f89-4343-8b88-a8c9a8dd0f21"
  }) {
    id
    title
    status
    priority
  }
}

query GetTasks {
  tasks(projectId: "d2413554-5f89-4343-8b88-a8c9a8dd0f21", limit: 10) {
    edges {
      node {
        id
        title
        status
        priority
        creator {
          name
        }
        project {
          name
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
  }
}

query GetProjects {
  projects {
    id
    name
    description
  
    
  }
}

query Me {
  me {
    id
    name
    email
    createdAt
  }
}
