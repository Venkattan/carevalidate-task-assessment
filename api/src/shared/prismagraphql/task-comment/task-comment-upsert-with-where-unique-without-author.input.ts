import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { TaskCommentWhereUniqueInput } from './task-comment-where-unique.input';
import { Type } from 'class-transformer';
import { TaskCommentUpdateWithoutAuthorInput } from './task-comment-update-without-author.input';
import { TaskCommentCreateWithoutAuthorInput } from './task-comment-create-without-author.input';

@InputType()
export class TaskCommentUpsertWithWhereUniqueWithoutAuthorInput {

    @Field(() => TaskCommentWhereUniqueInput, {nullable:false})
    @Type(() => TaskCommentWhereUniqueInput)
    where!: Prisma.AtLeast<TaskCommentWhereUniqueInput, 'id'>;

    @Field(() => TaskCommentUpdateWithoutAuthorInput, {nullable:false})
    @Type(() => TaskCommentUpdateWithoutAuthorInput)
    update!: TaskCommentUpdateWithoutAuthorInput;

    @Field(() => TaskCommentCreateWithoutAuthorInput, {nullable:false})
    @Type(() => TaskCommentCreateWithoutAuthorInput)
    create!: TaskCommentCreateWithoutAuthorInput;
}
