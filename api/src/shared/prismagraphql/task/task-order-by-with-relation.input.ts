import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { ProjectOrderByWithRelationInput } from '../project/project-order-by-with-relation.input';
import { TaskCommentOrderByRelationAggregateInput } from '../task-comment/task-comment-order-by-relation-aggregate.input';

@InputType()
export class TaskOrderByWithRelationInput {

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

    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    creator?: UserOrderByWithRelationInput;

    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    assignee?: UserOrderByWithRelationInput;

    @Field(() => ProjectOrderByWithRelationInput, {nullable:true})
    project?: ProjectOrderByWithRelationInput;

    @Field(() => TaskCommentOrderByRelationAggregateInput, {nullable:true})
    comments?: TaskCommentOrderByRelationAggregateInput;
}
