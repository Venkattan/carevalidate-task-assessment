import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { TaskOrderByRelationAggregateInput } from '../task/task-order-by-relation-aggregate.input';
import { TaskCommentOrderByRelationAggregateInput } from '../task-comment/task-comment-order-by-relation-aggregate.input';
import { ProjectMemberOrderByRelationAggregateInput } from '../project-member/project-member-order-by-relation-aggregate.input';

@InputType()
export class UserOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    email?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    password?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;

    @Field(() => TaskOrderByRelationAggregateInput, {nullable:true})
    createdTasks?: TaskOrderByRelationAggregateInput;

    @Field(() => TaskOrderByRelationAggregateInput, {nullable:true})
    assignedTasks?: TaskOrderByRelationAggregateInput;

    @Field(() => TaskCommentOrderByRelationAggregateInput, {nullable:true})
    comments?: TaskCommentOrderByRelationAggregateInput;

    @Field(() => ProjectMemberOrderByRelationAggregateInput, {nullable:true})
    projects?: ProjectMemberOrderByRelationAggregateInput;
}
