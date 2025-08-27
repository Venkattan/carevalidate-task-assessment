import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TaskCommentWhereInput } from './task-comment-where.input';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteManyTaskCommentArgs {

    @Field(() => TaskCommentWhereInput, {nullable:true})
    @Type(() => TaskCommentWhereInput)
    where?: TaskCommentWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
