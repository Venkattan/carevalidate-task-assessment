import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCreateWithoutAssigneeInput } from './task-create-without-assignee.input';
import { Type } from 'class-transformer';
import { TaskCreateOrConnectWithoutAssigneeInput } from './task-create-or-connect-without-assignee.input';
import { TaskUpsertWithWhereUniqueWithoutAssigneeInput } from './task-upsert-with-where-unique-without-assignee.input';
import { TaskCreateManyAssigneeInputEnvelope } from './task-create-many-assignee-input-envelope.input';
import { Prisma } from '@prisma/client';
import { TaskWhereUniqueInput } from './task-where-unique.input';
import { TaskUpdateWithWhereUniqueWithoutAssigneeInput } from './task-update-with-where-unique-without-assignee.input';
import { TaskUpdateManyWithWhereWithoutAssigneeInput } from './task-update-many-with-where-without-assignee.input';
import { TaskScalarWhereInput } from './task-scalar-where.input';

@InputType()
export class TaskUncheckedUpdateManyWithoutAssigneeNestedInput {

    @Field(() => [TaskCreateWithoutAssigneeInput], {nullable:true})
    @Type(() => TaskCreateWithoutAssigneeInput)
    create?: Array<TaskCreateWithoutAssigneeInput>;

    @Field(() => [TaskCreateOrConnectWithoutAssigneeInput], {nullable:true})
    @Type(() => TaskCreateOrConnectWithoutAssigneeInput)
    connectOrCreate?: Array<TaskCreateOrConnectWithoutAssigneeInput>;

    @Field(() => [TaskUpsertWithWhereUniqueWithoutAssigneeInput], {nullable:true})
    @Type(() => TaskUpsertWithWhereUniqueWithoutAssigneeInput)
    upsert?: Array<TaskUpsertWithWhereUniqueWithoutAssigneeInput>;

    @Field(() => TaskCreateManyAssigneeInputEnvelope, {nullable:true})
    @Type(() => TaskCreateManyAssigneeInputEnvelope)
    createMany?: TaskCreateManyAssigneeInputEnvelope;

    @Field(() => [TaskWhereUniqueInput], {nullable:true})
    @Type(() => TaskWhereUniqueInput)
    set?: Array<Prisma.AtLeast<TaskWhereUniqueInput, 'id'>>;

    @Field(() => [TaskWhereUniqueInput], {nullable:true})
    @Type(() => TaskWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<TaskWhereUniqueInput, 'id'>>;

    @Field(() => [TaskWhereUniqueInput], {nullable:true})
    @Type(() => TaskWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<TaskWhereUniqueInput, 'id'>>;

    @Field(() => [TaskWhereUniqueInput], {nullable:true})
    @Type(() => TaskWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<TaskWhereUniqueInput, 'id'>>;

    @Field(() => [TaskUpdateWithWhereUniqueWithoutAssigneeInput], {nullable:true})
    @Type(() => TaskUpdateWithWhereUniqueWithoutAssigneeInput)
    update?: Array<TaskUpdateWithWhereUniqueWithoutAssigneeInput>;

    @Field(() => [TaskUpdateManyWithWhereWithoutAssigneeInput], {nullable:true})
    @Type(() => TaskUpdateManyWithWhereWithoutAssigneeInput)
    updateMany?: Array<TaskUpdateManyWithWhereWithoutAssigneeInput>;

    @Field(() => [TaskScalarWhereInput], {nullable:true})
    @Type(() => TaskScalarWhereInput)
    deleteMany?: Array<TaskScalarWhereInput>;
}
