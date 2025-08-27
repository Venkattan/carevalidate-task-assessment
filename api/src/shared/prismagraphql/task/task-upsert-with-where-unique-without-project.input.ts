import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { TaskWhereUniqueInput } from './task-where-unique.input';
import { Type } from 'class-transformer';
import { TaskUpdateWithoutProjectInput } from './task-update-without-project.input';
import { TaskCreateWithoutProjectInput } from './task-create-without-project.input';

@InputType()
export class TaskUpsertWithWhereUniqueWithoutProjectInput {

    @Field(() => TaskWhereUniqueInput, {nullable:false})
    @Type(() => TaskWhereUniqueInput)
    where!: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

    @Field(() => TaskUpdateWithoutProjectInput, {nullable:false})
    @Type(() => TaskUpdateWithoutProjectInput)
    update!: TaskUpdateWithoutProjectInput;

    @Field(() => TaskCreateWithoutProjectInput, {nullable:false})
    @Type(() => TaskCreateWithoutProjectInput)
    create!: TaskCreateWithoutProjectInput;
}
