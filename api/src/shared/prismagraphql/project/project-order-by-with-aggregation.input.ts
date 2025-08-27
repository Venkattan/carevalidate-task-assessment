import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ProjectCountOrderByAggregateInput } from './project-count-order-by-aggregate.input';
import { ProjectMaxOrderByAggregateInput } from './project-max-order-by-aggregate.input';
import { ProjectMinOrderByAggregateInput } from './project-min-order-by-aggregate.input';

@InputType()
export class ProjectOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;

    @Field(() => SortOrderInput, {nullable:true})
    description?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;

    @Field(() => ProjectCountOrderByAggregateInput, {nullable:true})
    _count?: ProjectCountOrderByAggregateInput;

    @Field(() => ProjectMaxOrderByAggregateInput, {nullable:true})
    _max?: ProjectMaxOrderByAggregateInput;

    @Field(() => ProjectMinOrderByAggregateInput, {nullable:true})
    _min?: ProjectMinOrderByAggregateInput;
}
