import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ProjectMemberCountOrderByAggregateInput } from './project-member-count-order-by-aggregate.input';
import { ProjectMemberMaxOrderByAggregateInput } from './project-member-max-order-by-aggregate.input';
import { ProjectMemberMinOrderByAggregateInput } from './project-member-min-order-by-aggregate.input';

@InputType()
export class ProjectMemberOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    projectId?: `${SortOrder}`;

    @Field(() => ProjectMemberCountOrderByAggregateInput, {nullable:true})
    _count?: ProjectMemberCountOrderByAggregateInput;

    @Field(() => ProjectMemberMaxOrderByAggregateInput, {nullable:true})
    _max?: ProjectMemberMaxOrderByAggregateInput;

    @Field(() => ProjectMemberMinOrderByAggregateInput, {nullable:true})
    _min?: ProjectMemberMinOrderByAggregateInput;
}
