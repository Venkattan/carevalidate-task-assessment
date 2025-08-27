import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskStatus } from '../prisma/task-status.enum';
import { TaskPriority } from '../prisma/task-priority.enum';

@InputType()
export class TaskCreateManyCreatorInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => TaskStatus, {nullable:true})
    status?: `${TaskStatus}`;

    @Field(() => TaskPriority, {nullable:true})
    priority?: `${TaskPriority}`;

    @Field(() => Date, {nullable:true})
    dueDate?: Date | string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => String, {nullable:true})
    assignedTo?: string;

    @Field(() => String, {nullable:false})
    projectId!: string;
}
