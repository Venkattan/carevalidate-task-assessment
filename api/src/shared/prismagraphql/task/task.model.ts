import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { TaskStatus } from '../prisma/task-status.enum';
import { TaskPriority } from '../prisma/task-priority.enum';
import { User } from '../user/user.model';
import { Project } from '../project/project.model';
import { TaskComment } from '../task-comment/task-comment.model';
import { TaskCount } from './task-count.output';

@ObjectType()
export class Task {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => String, {nullable:true})
    description!: string | null;

    @Field(() => TaskStatus, {defaultValue:'TODO',nullable:false})
    status!: `${TaskStatus}`;

    @Field(() => TaskPriority, {defaultValue:'MEDIUM',nullable:false})
    priority!: `${TaskPriority}`;

    @Field(() => Date, {nullable:true})
    dueDate!: Date | null;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => String, {nullable:false})
    createdBy!: string;

    @Field(() => String, {nullable:true})
    assignedTo!: string | null;

    @Field(() => String, {nullable:false})
    projectId!: string;

    @Field(() => User, {nullable:false})
    creator?: User;

    @Field(() => User, {nullable:true})
    assignee?: User | null;

    @Field(() => Project, {nullable:false})
    project?: Project;

    @Field(() => [TaskComment], {nullable:true})
    comments?: Array<TaskComment>;

    @Field(() => TaskCount, {nullable:false})
    _count?: TaskCount;
}
