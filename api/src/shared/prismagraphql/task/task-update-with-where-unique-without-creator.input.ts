import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { TaskWhereUniqueInput } from './task-where-unique.input';
import { Type } from 'class-transformer';
import { TaskUpdateWithoutCreatorInput } from './task-update-without-creator.input';

@InputType()
export class TaskUpdateWithWhereUniqueWithoutCreatorInput {

    @Field(() => TaskWhereUniqueInput, {nullable:false})
    @Type(() => TaskWhereUniqueInput)
    where!: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

    @Field(() => TaskUpdateWithoutCreatorInput, {nullable:false})
    @Type(() => TaskUpdateWithoutCreatorInput)
    data!: TaskUpdateWithoutCreatorInput;
}
