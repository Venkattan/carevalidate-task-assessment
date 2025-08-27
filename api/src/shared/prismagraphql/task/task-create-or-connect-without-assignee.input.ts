import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { TaskWhereUniqueInput } from './task-where-unique.input';
import { Type } from 'class-transformer';
import { TaskCreateWithoutAssigneeInput } from './task-create-without-assignee.input';

@InputType()
export class TaskCreateOrConnectWithoutAssigneeInput {

    @Field(() => TaskWhereUniqueInput, {nullable:false})
    @Type(() => TaskWhereUniqueInput)
    where!: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

    @Field(() => TaskCreateWithoutAssigneeInput, {nullable:false})
    @Type(() => TaskCreateWithoutAssigneeInput)
    create!: TaskCreateWithoutAssigneeInput;
}
