import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { TaskCommentWhereUniqueInput } from './task-comment-where-unique.input';
import { Type } from 'class-transformer';
import { TaskCommentUpdateWithoutTaskInput } from './task-comment-update-without-task.input';

@InputType()
export class TaskCommentUpdateWithWhereUniqueWithoutTaskInput {

    @Field(() => TaskCommentWhereUniqueInput, {nullable:false})
    @Type(() => TaskCommentWhereUniqueInput)
    where!: Prisma.AtLeast<TaskCommentWhereUniqueInput, 'id'>;

    @Field(() => TaskCommentUpdateWithoutTaskInput, {nullable:false})
    @Type(() => TaskCommentUpdateWithoutTaskInput)
    data!: TaskCommentUpdateWithoutTaskInput;
}
