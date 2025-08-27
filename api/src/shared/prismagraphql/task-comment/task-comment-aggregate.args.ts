import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TaskCommentWhereInput } from './task-comment-where.input';
import { Type } from 'class-transformer';
import { TaskCommentOrderByWithRelationInput } from './task-comment-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { TaskCommentWhereUniqueInput } from './task-comment-where-unique.input';
import { Int } from '@nestjs/graphql';
import { TaskCommentCountAggregateInput } from './task-comment-count-aggregate.input';
import { TaskCommentMinAggregateInput } from './task-comment-min-aggregate.input';
import { TaskCommentMaxAggregateInput } from './task-comment-max-aggregate.input';

@ArgsType()
export class TaskCommentAggregateArgs {

    @Field(() => TaskCommentWhereInput, {nullable:true})
    @Type(() => TaskCommentWhereInput)
    where?: TaskCommentWhereInput;

    @Field(() => [TaskCommentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<TaskCommentOrderByWithRelationInput>;

    @Field(() => TaskCommentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<TaskCommentWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => TaskCommentCountAggregateInput, {nullable:true})
    _count?: TaskCommentCountAggregateInput;

    @Field(() => TaskCommentMinAggregateInput, {nullable:true})
    _min?: TaskCommentMinAggregateInput;

    @Field(() => TaskCommentMaxAggregateInput, {nullable:true})
    _max?: TaskCommentMaxAggregateInput;
}
