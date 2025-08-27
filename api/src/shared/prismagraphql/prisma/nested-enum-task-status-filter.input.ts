import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskStatus } from './task-status.enum';

@InputType()
export class NestedEnumTaskStatusFilter {

    @Field(() => TaskStatus, {nullable:true})
    equals?: `${TaskStatus}`;

    @Field(() => [TaskStatus], {nullable:true})
    in?: Array<`${TaskStatus}`>;

    @Field(() => [TaskStatus], {nullable:true})
    notIn?: Array<`${TaskStatus}`>;

    @Field(() => NestedEnumTaskStatusFilter, {nullable:true})
    not?: NestedEnumTaskStatusFilter;
}
