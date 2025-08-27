import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskPriority } from './task-priority.enum';

@InputType()
export class NestedEnumTaskPriorityFilter {

    @Field(() => TaskPriority, {nullable:true})
    equals?: `${TaskPriority}`;

    @Field(() => [TaskPriority], {nullable:true})
    in?: Array<`${TaskPriority}`>;

    @Field(() => [TaskPriority], {nullable:true})
    notIn?: Array<`${TaskPriority}`>;

    @Field(() => NestedEnumTaskPriorityFilter, {nullable:true})
    not?: NestedEnumTaskPriorityFilter;
}
