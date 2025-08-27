import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { TaskOrderByRelationAggregateInput } from '../task/task-order-by-relation-aggregate.input';
import { ProjectMemberOrderByRelationAggregateInput } from '../project-member/project-member-order-by-relation-aggregate.input';

@InputType()
export class ProjectOrderByWithRelationInput {

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

    @Field(() => TaskOrderByRelationAggregateInput, {nullable:true})
    tasks?: TaskOrderByRelationAggregateInput;

    @Field(() => ProjectMemberOrderByRelationAggregateInput, {nullable:true})
    members?: ProjectMemberOrderByRelationAggregateInput;
}
