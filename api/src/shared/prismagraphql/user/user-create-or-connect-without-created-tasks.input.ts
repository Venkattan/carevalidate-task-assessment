import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutCreatedTasksInput } from './user-create-without-created-tasks.input';

@InputType()
export class UserCreateOrConnectWithoutCreatedTasksInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

    @Field(() => UserCreateWithoutCreatedTasksInput, {nullable:false})
    @Type(() => UserCreateWithoutCreatedTasksInput)
    create!: UserCreateWithoutCreatedTasksInput;
}
