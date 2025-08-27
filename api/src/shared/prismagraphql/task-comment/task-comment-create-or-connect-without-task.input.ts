import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { TaskCommentWhereUniqueInput } from './task-comment-where-unique.input';
import { Type } from 'class-transformer';
import { TaskCommentCreateWithoutTaskInput } from './task-comment-create-without-task.input';

@InputType()
export class TaskCommentCreateOrConnectWithoutTaskInput {

    @Field(() => TaskCommentWhereUniqueInput, {nullable:false})
    @Type(() => TaskCommentWhereUniqueInput)
    where!: Prisma.AtLeast<TaskCommentWhereUniqueInput, 'id'>;

    @Field(() => TaskCommentCreateWithoutTaskInput, {nullable:false})
    @Type(() => TaskCommentCreateWithoutTaskInput)
    create!: TaskCommentCreateWithoutTaskInput;
}
