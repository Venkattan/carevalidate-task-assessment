import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TaskCommentUpdateInput } from './task-comment-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { TaskCommentWhereUniqueInput } from './task-comment-where-unique.input';

@ArgsType()
export class UpdateOneTaskCommentArgs {

    @Field(() => TaskCommentUpdateInput, {nullable:false})
    @Type(() => TaskCommentUpdateInput)
    data!: TaskCommentUpdateInput;

    @Field(() => TaskCommentWhereUniqueInput, {nullable:false})
    @Type(() => TaskCommentWhereUniqueInput)
    where!: Prisma.AtLeast<TaskCommentWhereUniqueInput, 'id'>;
}
