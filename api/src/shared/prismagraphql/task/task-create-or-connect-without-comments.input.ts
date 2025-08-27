import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { TaskWhereUniqueInput } from './task-where-unique.input';
import { Type } from 'class-transformer';
import { TaskCreateWithoutCommentsInput } from './task-create-without-comments.input';

@InputType()
export class TaskCreateOrConnectWithoutCommentsInput {

    @Field(() => TaskWhereUniqueInput, {nullable:false})
    @Type(() => TaskWhereUniqueInput)
    where!: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

    @Field(() => TaskCreateWithoutCommentsInput, {nullable:false})
    @Type(() => TaskCreateWithoutCommentsInput)
    create!: TaskCreateWithoutCommentsInput;
}
