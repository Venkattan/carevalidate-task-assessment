import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { TaskCommentWhereUniqueInput } from './task-comment-where-unique.input';
import { Type } from 'class-transformer';
import { TaskCommentCreateInput } from './task-comment-create.input';
import { TaskCommentUpdateInput } from './task-comment-update.input';

@ArgsType()
export class UpsertOneTaskCommentArgs {

    @Field(() => TaskCommentWhereUniqueInput, {nullable:false})
    @Type(() => TaskCommentWhereUniqueInput)
    where!: Prisma.AtLeast<TaskCommentWhereUniqueInput, 'id'>;

    @Field(() => TaskCommentCreateInput, {nullable:false})
    @Type(() => TaskCommentCreateInput)
    create!: TaskCommentCreateInput;

    @Field(() => TaskCommentUpdateInput, {nullable:false})
    @Type(() => TaskCommentUpdateInput)
    update!: TaskCommentUpdateInput;
}
