import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCreateWithoutCommentsInput } from './task-create-without-comments.input';
import { Type } from 'class-transformer';
import { TaskCreateOrConnectWithoutCommentsInput } from './task-create-or-connect-without-comments.input';
import { Prisma } from '@prisma/client';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskCreateNestedOneWithoutCommentsInput {

    @Field(() => TaskCreateWithoutCommentsInput, {nullable:true})
    @Type(() => TaskCreateWithoutCommentsInput)
    create?: TaskCreateWithoutCommentsInput;

    @Field(() => TaskCreateOrConnectWithoutCommentsInput, {nullable:true})
    @Type(() => TaskCreateOrConnectWithoutCommentsInput)
    connectOrCreate?: TaskCreateOrConnectWithoutCommentsInput;

    @Field(() => TaskWhereUniqueInput, {nullable:true})
    @Type(() => TaskWhereUniqueInput)
    connect?: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;
}
