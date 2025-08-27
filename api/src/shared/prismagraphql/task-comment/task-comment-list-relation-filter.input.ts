import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCommentWhereInput } from './task-comment-where.input';

@InputType()
export class TaskCommentListRelationFilter {

    @Field(() => TaskCommentWhereInput, {nullable:true})
    every?: TaskCommentWhereInput;

    @Field(() => TaskCommentWhereInput, {nullable:true})
    some?: TaskCommentWhereInput;

    @Field(() => TaskCommentWhereInput, {nullable:true})
    none?: TaskCommentWhereInput;
}
