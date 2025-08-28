import { InputType, Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { User } from '../../auth/dto/auth.type';
import { Project } from '../../projects/dto/project.dto';

// Define enums to match Prisma schema exactly
export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

// Register enums for GraphQL
registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});

registerEnumType(TaskPriority, {
  name: 'TaskPriority',
});

@InputType()
export class CreateTaskInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => TaskStatus, { defaultValue: TaskStatus.TODO })
  @IsEnum(TaskStatus)
  status: TaskStatus = TaskStatus.TODO;

  @Field(() => TaskPriority, { defaultValue: TaskPriority.MEDIUM })
  @IsEnum(TaskPriority)
  priority: TaskPriority = TaskPriority.MEDIUM;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  dueDate?: Date;

  @Field()
  @IsNotEmpty()
  projectId: string;

  @Field({ nullable: true })
  @IsOptional()
  assignedTo?: string;
}

@InputType()
export class UpdateTaskInput {
  @Field({ nullable: true })
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => TaskStatus, { nullable: true })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @Field(() => TaskPriority, { nullable: true })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  dueDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  assignedTo?: string;
}

@ObjectType()
export class Task {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => TaskStatus)
  status: TaskStatus;

  @Field(() => TaskPriority)
  priority: TaskPriority;

  @Field(() => Date, { nullable: true })
  dueDate?: Date | null;

  @Field(() => Date)
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => String)
  createdBy: string;

  @Field(() => String, { nullable: true })
  assignedTo?: string | null;

  @Field(() => String)
  projectId: string;

  @Field(() => User)
  creator: User;

  @Field(() => User, { nullable: true })
  assignee?: User | null;

  @Field(() => Project)
  project: Project;

  @Field(() => [TaskComment], { nullable: true })
  comments?: TaskComment[];
}

@ObjectType()
export class TaskComment {
  @Field()
  id: string;

  @Field()
  content: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => User)
  author: User;

  @Field(() => Task)
  task: Task;
}

@ObjectType()
export class TaskEdge {
  @Field(() => Task)
  node: Task;

  @Field()
  cursor: string;
}

@ObjectType()
export class PageInfo {
  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;

  @Field({ nullable: true })
  startCursor?: string;

  @Field({ nullable: true })
  endCursor?: string;
}

@ObjectType()
export class TaskConnection {
  @Field(() => [TaskEdge])
  edges: TaskEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field()
  totalCount: number;
}
