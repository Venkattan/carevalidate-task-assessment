import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { TaskWhereUniqueInput } from './task-where-unique.input';
import { Type } from 'class-transformer';
import { TaskCreateWithoutProjectInput } from './task-create-without-project.input';

@InputType()
export class TaskCreateOrConnectWithoutProjectInput {

    @Field(() => TaskWhereUniqueInput, {nullable:false})
    @Type(() => TaskWhereUniqueInput)
    where!: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

    @Field(() => TaskCreateWithoutProjectInput, {nullable:false})
    @Type(() => TaskCreateWithoutProjectInput)
    create!: TaskCreateWithoutProjectInput;
}
