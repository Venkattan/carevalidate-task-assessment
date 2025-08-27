import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutAssignedTasksInput } from './user-create-without-assigned-tasks.input';

@InputType()
export class UserCreateOrConnectWithoutAssignedTasksInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

    @Field(() => UserCreateWithoutAssignedTasksInput, {nullable:false})
    @Type(() => UserCreateWithoutAssignedTasksInput)
    create!: UserCreateWithoutAssignedTasksInput;
}
