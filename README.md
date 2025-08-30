# TaskFlow - Full-Stack Task Management System

A modern, real-time task management application built with Vue.js, GraphQL, and NestJS, featuring live updates, project collaboration, and comprehensive task tracking.

## 🚀 Features

### Core Features
- **User Authentication** - JWT-based secure authentication
- **Project Management** - Create, manage, and collaborate on projects
- **Task Management** - Full CRUD operations with status tracking
- **Real-time Updates** - Live task updates using GraphQL subscriptions
- **Task Comments** - Collaborative task discussions
- **Team Collaboration** - Multi-user project access with role management

### Advanced Features
- **Performance Optimized** - DataLoader for N+1 query prevention
- **Database Optimization** - Strategic indexing and query optimization
- **Rate Limiting** - Comprehensive API rate limiting with monitoring
- **Cursor Pagination** - High-performance pagination for large datasets
- **Real-time Monitoring** - GraphQL and database performance analytics

## 🏗 Architecture

### System Overview
```
Frontend (Vue.js)          Backend (NestJS)           Database
┌─────────────────┐       ┌─────────────────┐       ┌─────────────┐
│                 │       │                 │       │             │
│ Vue 3 + Vite    │◄─────►│ GraphQL API     │◄─────►│ PostgreSQL  │
│ Apollo Client   │       │ Apollo Server   │       │ + Prisma    │
│ Tailwind CSS    │       │ JWT Auth        │       │             │
│ Vue Router      │       │ WebSocket       │       │             │
│                 │       │ Rate Limiting   │       │             │
└─────────────────┘       └─────────────────┘       └─────────────┘
        │                          │
        └──── WebSocket ───────────┘
           (Real-time Updates)
```

### Backend Architecture (NestJS)

#### 🔧 Technology Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: NestJS (GraphQL-first)
- **GraphQL**: Apollo Server with code-first approach
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Real-time**: GraphQL subscriptions via WebSocket
- **Performance**: DataLoader, Redis caching, strategic database indexing

#### 📁 Project Structure
```
task-management-backend/
├── src/
│   ├── app.module.ts              # Root application module
│   ├── main.ts                    # Application entry point
│   ├── schema.graphql             # Auto-generated GraphQL schema
│   │
│   ├── auth/                      # Authentication module
│   │   ├── auth.module.ts
│   │   ├── auth.resolver.ts       # Login, register, me queries
│   │   ├── auth.service.ts        # JWT and password management
│   │   ├── guards/                # Authentication guards
│   │   └── strategies/            # JWT strategy
│   │
│   ├── users/                     # User management
│   │   ├── users.resolver.ts      # User queries and mutations
│   │   └── users.service.ts
│   │
│   ├── projects/                  # Project management
│   │   ├── projects.resolver.ts   # Project CRUD operations
│   │   ├── projects.service.ts    # Business logic
│   │   └── dto/                   # Data transfer objects
│   │
│   ├── tasks/                     # Task management
│   │   ├── tasks.resolver.ts      # Task CRUD operations
│   │   ├── tasks.service.ts       # Task business logic
│   │   ├── task-field.resolver.ts # Field resolvers
│   │   └── dto/                   # Task-related DTOs
│   │
│   ├── comments/                  # Task comments
│   │   ├── comments.resolver.ts   # Comment operations
│   │   └── comments.service.ts
│   │
│   ├── common/                    # Shared utilities
│   │   ├── database/              # Database connections
│   │   ├── dataloader/            # N+1 query prevention
│   │   ├── performance/           # Performance monitoring
│   │   ├── rate-limit/            # Rate limiting
│   │   └── pagination/            # Cursor pagination
│   │
│   └── prisma/                    # Database integration
│       ├── prisma.service.ts
│       └── prisma.module.ts
│
├── prisma/
│   ├── schema.prisma              # Database schema
│   ├── seed.ts                    # Database seeding
│   └── migrations/                # Database migrations
│
├── docker-compose.yml             # PostgreSQL setup
└── package.json
```

#### 🗄 Database Schema
```sql
-- Core entities with relationships
Users ──┐
         ├─── ProjectMembers ──── Projects
         │                          │
         └─── Tasks ─────────────────┘
               │
               └─── TaskComments
```

**Key Models**:
- **User**: Authentication and profile information
- **Project**: Project containers with member management
- **Task**: Core task entity with status, priority, assignments
- **TaskComment**: Collaborative comments on tasks
- **ProjectMember**: Many-to-many relationship for project access

### Frontend Architecture (Vue.js)

#### 🎨 Technology Stack
- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite with TypeScript
- **Styling**: Tailwind CSS v3
- **GraphQL**: Apollo Client with Vue integration
- **Routing**: Vue Router 4
- **Icons**: Heroicons
- **State Management**: Composable-based global state
- **Real-time**: GraphQL subscriptions

#### 📁 Frontend Structure
```
frontend/
├── src/
│   ├── main.ts                    # Application entry point
│   ├── App.vue                    # Root component
│   ├── style.css                  # Global styles (Tailwind)
│   │
│   ├── apollo/                    # GraphQL setup
│   │   ├── client.ts              # Apollo Client configuration
│   │   └── queries.ts             # GraphQL queries, mutations, subscriptions
│   │
│   ├── router/                    # Vue Router setup
│   │   └── index.ts               # Route definitions and guards
│   │
│   ├── store/                     # Global state management
│   │   └── index.ts               # Reactive state with composables
│   │
│   ├── types/                     # TypeScript definitions
│   │   └── index.ts               # Shared type definitions
│   │
│   ├── views/                     # Page components
│   │   ├── Auth/
│   │   │   ├── Login.vue          # Authentication pages
│   │   │   └── Register.vue
│   │   ├── Dashboard.vue          # Main dashboard
│   │   ├── Projects/
│   │   │   ├── ProjectList.vue    # Project management
│   │   │   └── ProjectDetail.vue
│   │   └── Tasks/
│   │       ├── TaskBoard.vue      # Kanban-style task board
│   │       └── TaskDetail.vue     # Task details
│   │
│   └── components/                # Reusable components
│       ├── Notifications/
│       │   └── NotificationList.vue # Toast notifications
│       ├── Projects/
│       │   └── CreateProjectModal.vue
│       └── Tasks/
│           ├── TaskCard.vue       # Task card component
│           ├── CreateTaskModal.vue
│           └── TaskDetailModal.vue
│
├── public/                        # Static assets
├── index.html                     # HTML template
├── vite.config.ts                 # Vite configuration
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
└── package.json
```

## 🛠 Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL (v13+)
- npm or yarn package manager
- Git

### Backend Setup

1. **Clone and Navigate**
   ```bash
   git clone <repository-url>
   cd task-management-backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   ```bash
   # Start PostgreSQL with Docker
   docker-compose up -d
   
   # Or configure your local PostgreSQL and update .env
   ```

4. **Environment Configuration**
   ```bash
   # Create .env file
   cp .env.example .env
   
   # Update with your settings
   DATABASE_URL="postgresql://username:password@localhost:5432/taskflow"
   JWT_SECRET="your-super-secret-jwt-key"
   JWT_EXPIRES_IN="24h"
   ```

5. **Database Migration & Seeding**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma db push
   
   # Seed database (optional)
   npm run seed
   ```

6. **Start Backend Server**
   ```bash
   # Development mode
   npm run start:dev
   
   # The server will start on http://localhost:3000
   # GraphQL Playground: http://localhost:3000/graphql
   ```

### Frontend Setup

1. **Navigate to Frontend**
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Create .env file (optional - defaults work for local development)
   VITE_GRAPHQL_URI=http://localhost:3000/graphql
   VITE_WEBSOCKET_URI=ws://localhost:3000/graphql
   ```

4. **Start Frontend Development Server**
   ```bash
   npm run dev
   
   # The frontend will start on http://localhost:5173
   ```

### Production Deployment

#### Backend Production
```bash
# Build the application
npm run build

# Start in production mode
npm run start:prod
```

#### Frontend Production
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy the 'dist' folder to your hosting service
```

## 🔗 GraphQL API

### Core Endpoints
- **GraphQL Endpoint**: `http://localhost:3000/graphql`
- **WebSocket Endpoint**: `ws://localhost:3000/graphql`
- **GraphQL Playground**: `http://localhost:3000/graphql` (development only)

### Key Operations

#### Authentication
```graphql
# Register new user
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    access_token
    user { id email name }
  }
}

# Login
mutation Login($input: LoginInput!) {
  login(input: $input) {
    access_token
    user { id email name }
  }
}
```

#### Task Management
```graphql
# Get tasks with pagination
query GetTasks($projectId: String!, $limit: Float, $offset: Float) {
  tasks(projectId: $projectId, limit: $limit, offset: $offset) {
    edges { node { id title status priority } }
    pageInfo { hasNextPage }
  }
}

# Real-time task updates
subscription TaskUpdated($projectId: String!) {
  taskUpdated(projectId: $projectId) {
    id title status priority
  }
}
```

## 🎯 Key Features in Detail

### Real-time Collaboration
- **WebSocket Integration**: Automatic updates when tasks are created, updated, or deleted
- **Live Notifications**: In-app toast notifications for real-time events
- **Multi-user Support**: Multiple users can work on the same project simultaneously

### Performance Optimizations
- **DataLoader Implementation**: Prevents N+1 queries for related data
- **Strategic Database Indexes**: 15+ optimized indexes for common query patterns
- **Cursor Pagination**: Efficient pagination for large datasets
- **Query Performance Monitoring**: Real-time analytics for slow queries

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Route Guards**: Protected routes and GraphQL resolvers
- **Rate Limiting**: API endpoint protection with configurable limits
- **Input Validation**: Comprehensive data validation on all inputs

## 🧪 Development

### Available Scripts

#### Backend
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:prod` - Start in production mode
- `npm run build` - Build the application
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run seed` - Seed the database with sample data

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

### Development Tips

1. **Database Changes**: Run `npx prisma db push` after schema changes
2. **GraphQL Schema**: Automatically generated from NestJS decorators
3. **Hot Reload**: Both frontend and backend support hot reload
4. **Type Safety**: Full TypeScript integration across the stack

## 📊 Monitoring & Analytics

### Performance Monitoring
- **GraphQL Query Analytics**: Built-in performance tracking
- **Database Query Monitoring**: Slow query detection and optimization
- **Rate Limiting Statistics**: API usage analytics
- **Real-time Dashboards**: Performance metrics via GraphQL endpoints

### Health Checks
- Database connectivity monitoring
- GraphQL endpoint health checks
- WebSocket connection status
- Background service monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   ```bash
   # Check if PostgreSQL is running
   docker-compose ps
   
   # Reset database
   npx prisma db push --force-reset
   ```

2. **GraphQL Schema Issues**
   ```bash
   # Regenerate schema
   npm run start:dev
   ```

3. **Frontend Build Issues**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **WebSocket Connection Issues**
   - Ensure backend is running on correct port
   - Check firewall settings for WebSocket connections
   - Verify CORS configuration

### Support
For additional support, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using Vue.js, GraphQL, and NestJS**
