import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TaskCommentUpdateManyMutationInput } from './task-comment-update-many-mutation.input';
import { Type } from 'class-transformer';
import { TaskCommentWhereInput } from './task-comment-where.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateManyTaskCommentArgs {

    @Field(() => TaskCommentUpdateManyMutationInput, {nullable:false})
    @Type(() => TaskCommentUpdateManyMutationInput)
    data!: TaskCommentUpdateManyMutationInput;

    @Field(() => TaskCommentWhereInput, {nullable:true})
    @Type(() => TaskCommentWhereInput)
    where?: TaskCommentWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
