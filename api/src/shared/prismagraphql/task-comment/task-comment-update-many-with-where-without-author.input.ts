import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCommentScalarWhereInput } from './task-comment-scalar-where.input';
import { Type } from 'class-transformer';
import { TaskCommentUpdateManyMutationInput } from './task-comment-update-many-mutation.input';

@InputType()
export class TaskCommentUpdateManyWithWhereWithoutAuthorInput {

    @Field(() => TaskCommentScalarWhereInput, {nullable:false})
    @Type(() => TaskCommentScalarWhereInput)
    where!: TaskCommentScalarWhereInput;

    @Field(() => TaskCommentUpdateManyMutationInput, {nullable:false})
    @Type(() => TaskCommentUpdateManyMutationInput)
    data!: TaskCommentUpdateManyMutationInput;
}
