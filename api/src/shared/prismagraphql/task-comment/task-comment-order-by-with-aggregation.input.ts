import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { TaskCommentCountOrderByAggregateInput } from './task-comment-count-order-by-aggregate.input';
import { TaskCommentMaxOrderByAggregateInput } from './task-comment-max-order-by-aggregate.input';
import { TaskCommentMinOrderByAggregateInput } from './task-comment-min-order-by-aggregate.input';

@InputType()
export class TaskCommentOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    content?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    taskId?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    authorId?: `${SortOrder}`;

    @Field(() => TaskCommentCountOrderByAggregateInput, {nullable:true})
    _count?: TaskCommentCountOrderByAggregateInput;

    @Field(() => TaskCommentMaxOrderByAggregateInput, {nullable:true})
    _max?: TaskCommentMaxOrderByAggregateInput;

    @Field(() => TaskCommentMinOrderByAggregateInput, {nullable:true})
    _min?: TaskCommentMinOrderByAggregateInput;
}
