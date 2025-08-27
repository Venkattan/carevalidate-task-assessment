import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskPriority } from './task-priority.enum';
import { NestedEnumTaskPriorityFilter } from './nested-enum-task-priority-filter.input';

@InputType()
export class EnumTaskPriorityFilter {

    @Field(() => TaskPriority, {nullable:true})
    equals?: `${TaskPriority}`;

    @Field(() => [TaskPriority], {nullable:true})
    in?: Array<`${TaskPriority}`>;

    @Field(() => [TaskPriority], {nullable:true})
    notIn?: Array<`${TaskPriority}`>;

    @Field(() => NestedEnumTaskPriorityFilter, {nullable:true})
    not?: NestedEnumTaskPriorityFilter;
}
