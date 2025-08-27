import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { TaskCountOrderByAggregateInput } from './task-count-order-by-aggregate.input';
import { TaskMaxOrderByAggregateInput } from './task-max-order-by-aggregate.input';
import { TaskMinOrderByAggregateInput } from './task-min-order-by-aggregate.input';

@InputType()
export class TaskOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    title?: `${SortOrder}`;

    @Field(() => SortOrderInput, {nullable:true})
    description?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    status?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    priority?: `${SortOrder}`;

    @Field(() => SortOrderInput, {nullable:true})
    dueDate?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    createdBy?: `${SortOrder}`;

    @Field(() => SortOrderInput, {nullable:true})
    assignedTo?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    projectId?: `${SortOrder}`;

    @Field(() => TaskCountOrderByAggregateInput, {nullable:true})
    _count?: TaskCountOrderByAggregateInput;

    @Field(() => TaskMaxOrderByAggregateInput, {nullable:true})
    _max?: TaskMaxOrderByAggregateInput;

    @Field(() => TaskMinOrderByAggregateInput, {nullable:true})
    _min?: TaskMinOrderByAggregateInput;
}
