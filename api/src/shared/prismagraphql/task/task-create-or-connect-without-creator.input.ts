import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { TaskWhereUniqueInput } from './task-where-unique.input';
import { Type } from 'class-transformer';
import { TaskCreateWithoutCreatorInput } from './task-create-without-creator.input';

@InputType()
export class TaskCreateOrConnectWithoutCreatorInput {

    @Field(() => TaskWhereUniqueInput, {nullable:false})
    @Type(() => TaskWhereUniqueInput)
    where!: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

    @Field(() => TaskCreateWithoutCreatorInput, {nullable:false})
    @Type(() => TaskCreateWithoutCreatorInput)
    create!: TaskCreateWithoutCreatorInput;
}
