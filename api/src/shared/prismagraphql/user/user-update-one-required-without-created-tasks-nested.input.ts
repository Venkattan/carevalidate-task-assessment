import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutCreatedTasksInput } from './user-create-without-created-tasks.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutCreatedTasksInput } from './user-create-or-connect-without-created-tasks.input';
import { UserUpsertWithoutCreatedTasksInput } from './user-upsert-without-created-tasks.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutCreatedTasksInput } from './user-update-to-one-with-where-without-created-tasks.input';

@InputType()
export class UserUpdateOneRequiredWithoutCreatedTasksNestedInput {

    @Field(() => UserCreateWithoutCreatedTasksInput, {nullable:true})
    @Type(() => UserCreateWithoutCreatedTasksInput)
    create?: UserCreateWithoutCreatedTasksInput;

    @Field(() => UserCreateOrConnectWithoutCreatedTasksInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutCreatedTasksInput)
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTasksInput;

    @Field(() => UserUpsertWithoutCreatedTasksInput, {nullable:true})
    @Type(() => UserUpsertWithoutCreatedTasksInput)
    upsert?: UserUpsertWithoutCreatedTasksInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

    @Field(() => UserUpdateToOneWithWhereWithoutCreatedTasksInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutCreatedTasksInput)
    update?: UserUpdateToOneWithWhereWithoutCreatedTasksInput;
}
