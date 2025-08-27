import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { TaskCommentWhereUniqueInput } from './task-comment-where-unique.input';
import { Type } from 'class-transformer';
import { TaskCommentCreateWithoutAuthorInput } from './task-comment-create-without-author.input';

@InputType()
export class TaskCommentCreateOrConnectWithoutAuthorInput {

    @Field(() => TaskCommentWhereUniqueInput, {nullable:false})
    @Type(() => TaskCommentWhereUniqueInput)
    where!: Prisma.AtLeast<TaskCommentWhereUniqueInput, 'id'>;

    @Field(() => TaskCommentCreateWithoutAuthorInput, {nullable:false})
    @Type(() => TaskCommentCreateWithoutAuthorInput)
    create!: TaskCommentCreateWithoutAuthorInput;
}
