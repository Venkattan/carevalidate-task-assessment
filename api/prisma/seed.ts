import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create demo users
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const user1 = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'developer@example.com' },
    update: {},
    create: {
      email: 'developer@example.com',
      name: 'Developer User',
      password: hashedPassword,
    },
  });

  // Create demo project
  const project = await prisma.project.upsert({
    where: { id: 'demo-project-id' },
    update: {},
    create: {
      id: 'demo-project-id',
      name: 'Demo Project',
      description: 'A demo project for testing the task management system',
      members: {
        create: [
          { userId: user1.id },
          { userId: user2.id },
        ],
      },
    },
  });

  // Create demo tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Setup Backend Infrastructure',
        description: 'Setup NestJS, Prisma, and PostgreSQL',
        status: 'DONE',
        priority: 'HIGH',
        createdBy: user1.id,
        assignedTo: user2.id,
        projectId: project.id,
      },
      {
        title: 'Implement Authentication',
        description: 'Add JWT-based authentication system',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        createdBy: user1.id,
        assignedTo: user2.id,
        projectId: project.id,
      },
      {
        title: 'Create Frontend Components',
        description: 'Build Vue.js components for task management',
        status: 'TODO',
        priority: 'MEDIUM',
        createdBy: user1.id,
        projectId: project.id,
      },
      {
        title: 'Add Real-time Features',
        description: 'Implement GraphQL subscriptions for real-time updates',
        status: 'TODO',
        priority: 'MEDIUM',
        createdBy: user2.id,
        assignedTo: user1.id,
        projectId: project.id,
      },
    ],
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
