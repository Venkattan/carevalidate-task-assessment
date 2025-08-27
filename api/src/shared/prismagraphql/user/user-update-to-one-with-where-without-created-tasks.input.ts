import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutCreatedTasksInput } from './user-update-without-created-tasks.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutCreatedTasksInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutCreatedTasksInput, {nullable:false})
    @Type(() => UserUpdateWithoutCreatedTasksInput)
    data!: UserUpdateWithoutCreatedTasksInput;
}
