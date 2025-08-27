import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskStatus } from './task-status.enum';
import { NestedEnumTaskStatusFilter } from './nested-enum-task-status-filter.input';

@InputType()
export class EnumTaskStatusFilter {

    @Field(() => TaskStatus, {nullable:true})
    equals?: `${TaskStatus}`;

    @Field(() => [TaskStatus], {nullable:true})
    in?: Array<`${TaskStatus}`>;

    @Field(() => [TaskStatus], {nullable:true})
    notIn?: Array<`${TaskStatus}`>;

    @Field(() => NestedEnumTaskStatusFilter, {nullable:true})
    not?: NestedEnumTaskStatusFilter;
}
