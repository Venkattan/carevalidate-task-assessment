import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { TaskStatus } from '../prisma/task-status.enum';
import { TaskPriority } from '../prisma/task-priority.enum';
import { TaskCountAggregate } from './task-count-aggregate.output';
import { TaskMinAggregate } from './task-min-aggregate.output';
import { TaskMaxAggregate } from './task-max-aggregate.output';

@ObjectType()
export class TaskGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => TaskStatus, {nullable:false})
    status!: `${TaskStatus}`;

    @Field(() => TaskPriority, {nullable:false})
    priority!: `${TaskPriority}`;

    @Field(() => Date, {nullable:true})
    dueDate?: Date | string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date | string;

    @Field(() => String, {nullable:false})
    createdBy!: string;

    @Field(() => String, {nullable:true})
    assignedTo?: string;

    @Field(() => String, {nullable:false})
    projectId!: string;

    @Field(() => TaskCountAggregate, {nullable:true})
    _count?: TaskCountAggregate;

    @Field(() => TaskMinAggregate, {nullable:true})
    _min?: TaskMinAggregate;

    @Field(() => TaskMaxAggregate, {nullable:true})
    _max?: TaskMaxAggregate;
}
