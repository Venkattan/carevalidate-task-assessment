import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TaskCommentWhereInput } from './task-comment-where.input';
import { Type } from 'class-transformer';
import { TaskCommentOrderByWithAggregationInput } from './task-comment-order-by-with-aggregation.input';
import { TaskCommentScalarFieldEnum } from './task-comment-scalar-field.enum';
import { TaskCommentScalarWhereWithAggregatesInput } from './task-comment-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { TaskCommentCountAggregateInput } from './task-comment-count-aggregate.input';
import { TaskCommentMinAggregateInput } from './task-comment-min-aggregate.input';
import { TaskCommentMaxAggregateInput } from './task-comment-max-aggregate.input';

@ArgsType()
export class TaskCommentGroupByArgs {

    @Field(() => TaskCommentWhereInput, {nullable:true})
    @Type(() => TaskCommentWhereInput)
    where?: TaskCommentWhereInput;

    @Field(() => [TaskCommentOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<TaskCommentOrderByWithAggregationInput>;

    @Field(() => [TaskCommentScalarFieldEnum], {nullable:false})
    by!: Array<`${TaskCommentScalarFieldEnum}`>;

    @Field(() => TaskCommentScalarWhereWithAggregatesInput, {nullable:true})
    having?: TaskCommentScalarWhereWithAggregatesInput;

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
