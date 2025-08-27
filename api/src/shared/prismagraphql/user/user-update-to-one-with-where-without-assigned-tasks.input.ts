import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutAssignedTasksInput } from './user-update-without-assigned-tasks.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutAssignedTasksInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutAssignedTasksInput, {nullable:false})
    @Type(() => UserUpdateWithoutAssignedTasksInput)
    data!: UserUpdateWithoutAssignedTasksInput;
}
