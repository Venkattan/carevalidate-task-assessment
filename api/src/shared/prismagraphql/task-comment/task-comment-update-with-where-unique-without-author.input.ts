import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { TaskCommentWhereUniqueInput } from './task-comment-where-unique.input';
import { Type } from 'class-transformer';
import { TaskCommentUpdateWithoutAuthorInput } from './task-comment-update-without-author.input';

@InputType()
export class TaskCommentUpdateWithWhereUniqueWithoutAuthorInput {

    @Field(() => TaskCommentWhereUniqueInput, {nullable:false})
    @Type(() => TaskCommentWhereUniqueInput)
    where!: Prisma.AtLeast<TaskCommentWhereUniqueInput, 'id'>;

    @Field(() => TaskCommentUpdateWithoutAuthorInput, {nullable:false})
    @Type(() => TaskCommentUpdateWithoutAuthorInput)
    data!: TaskCommentUpdateWithoutAuthorInput;
}
