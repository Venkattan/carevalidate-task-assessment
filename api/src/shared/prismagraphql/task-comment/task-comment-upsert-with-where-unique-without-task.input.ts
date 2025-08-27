import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { TaskCommentWhereUniqueInput } from './task-comment-where-unique.input';
import { Type } from 'class-transformer';
import { TaskCommentUpdateWithoutTaskInput } from './task-comment-update-without-task.input';
import { TaskCommentCreateWithoutTaskInput } from './task-comment-create-without-task.input';

@InputType()
export class TaskCommentUpsertWithWhereUniqueWithoutTaskInput {

    @Field(() => TaskCommentWhereUniqueInput, {nullable:false})
    @Type(() => TaskCommentWhereUniqueInput)
    where!: Prisma.AtLeast<TaskCommentWhereUniqueInput, 'id'>;

    @Field(() => TaskCommentUpdateWithoutTaskInput, {nullable:false})
    @Type(() => TaskCommentUpdateWithoutTaskInput)
    update!: TaskCommentUpdateWithoutTaskInput;

    @Field(() => TaskCommentCreateWithoutTaskInput, {nullable:false})
    @Type(() => TaskCommentCreateWithoutTaskInput)
    create!: TaskCommentCreateWithoutTaskInput;
}
