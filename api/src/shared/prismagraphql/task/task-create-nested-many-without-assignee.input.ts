import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCreateWithoutAssigneeInput } from './task-create-without-assignee.input';
import { Type } from 'class-transformer';
import { TaskCreateOrConnectWithoutAssigneeInput } from './task-create-or-connect-without-assignee.input';
import { TaskCreateManyAssigneeInputEnvelope } from './task-create-many-assignee-input-envelope.input';
import { Prisma } from '@prisma/client';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskCreateNestedManyWithoutAssigneeInput {

    @Field(() => [TaskCreateWithoutAssigneeInput], {nullable:true})
    @Type(() => TaskCreateWithoutAssigneeInput)
    create?: Array<TaskCreateWithoutAssigneeInput>;

    @Field(() => [TaskCreateOrConnectWithoutAssigneeInput], {nullable:true})
    @Type(() => TaskCreateOrConnectWithoutAssigneeInput)
    connectOrCreate?: Array<TaskCreateOrConnectWithoutAssigneeInput>;

    @Field(() => TaskCreateManyAssigneeInputEnvelope, {nullable:true})
    @Type(() => TaskCreateManyAssigneeInputEnvelope)
    createMany?: TaskCreateManyAssigneeInputEnvelope;

    @Field(() => [TaskWhereUniqueInput], {nullable:true})
    @Type(() => TaskWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<TaskWhereUniqueInput, 'id'>>;
}
