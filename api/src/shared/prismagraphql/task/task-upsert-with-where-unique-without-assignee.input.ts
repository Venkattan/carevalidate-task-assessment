import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { TaskWhereUniqueInput } from './task-where-unique.input';
import { Type } from 'class-transformer';
import { TaskUpdateWithoutAssigneeInput } from './task-update-without-assignee.input';
import { TaskCreateWithoutAssigneeInput } from './task-create-without-assignee.input';

@InputType()
export class TaskUpsertWithWhereUniqueWithoutAssigneeInput {

    @Field(() => TaskWhereUniqueInput, {nullable:false})
    @Type(() => TaskWhereUniqueInput)
    where!: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

    @Field(() => TaskUpdateWithoutAssigneeInput, {nullable:false})
    @Type(() => TaskUpdateWithoutAssigneeInput)
    update!: TaskUpdateWithoutAssigneeInput;

    @Field(() => TaskCreateWithoutAssigneeInput, {nullable:false})
    @Type(() => TaskCreateWithoutAssigneeInput)
    create!: TaskCreateWithoutAssigneeInput;
}
