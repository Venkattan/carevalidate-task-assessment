import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskPriority } from './task-priority.enum';
import { NestedEnumTaskPriorityWithAggregatesFilter } from './nested-enum-task-priority-with-aggregates-filter.input';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumTaskPriorityFilter } from './nested-enum-task-priority-filter.input';

@InputType()
export class EnumTaskPriorityWithAggregatesFilter {

    @Field(() => TaskPriority, {nullable:true})
    equals?: `${TaskPriority}`;

    @Field(() => [TaskPriority], {nullable:true})
    in?: Array<`${TaskPriority}`>;

    @Field(() => [TaskPriority], {nullable:true})
    notIn?: Array<`${TaskPriority}`>;

    @Field(() => NestedEnumTaskPriorityWithAggregatesFilter, {nullable:true})
    not?: NestedEnumTaskPriorityWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedEnumTaskPriorityFilter, {nullable:true})
    _min?: NestedEnumTaskPriorityFilter;

    @Field(() => NestedEnumTaskPriorityFilter, {nullable:true})
    _max?: NestedEnumTaskPriorityFilter;
}
