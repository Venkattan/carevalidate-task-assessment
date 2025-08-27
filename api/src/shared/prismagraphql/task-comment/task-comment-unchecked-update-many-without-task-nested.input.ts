import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCommentCreateWithoutTaskInput } from './task-comment-create-without-task.input';
import { Type } from 'class-transformer';
import { TaskCommentCreateOrConnectWithoutTaskInput } from './task-comment-create-or-connect-without-task.input';
import { TaskCommentUpsertWithWhereUniqueWithoutTaskInput } from './task-comment-upsert-with-where-unique-without-task.input';
import { TaskCommentCreateManyTaskInputEnvelope } from './task-comment-create-many-task-input-envelope.input';
import { Prisma } from '@prisma/client';
import { TaskCommentWhereUniqueInput } from './task-comment-where-unique.input';
import { TaskCommentUpdateWithWhereUniqueWithoutTaskInput } from './task-comment-update-with-where-unique-without-task.input';
import { TaskCommentUpdateManyWithWhereWithoutTaskInput } from './task-comment-update-many-with-where-without-task.input';
import { TaskCommentScalarWhereInput } from './task-comment-scalar-where.input';

@InputType()
export class TaskCommentUncheckedUpdateManyWithoutTaskNestedInput {

    @Field(() => [TaskCommentCreateWithoutTaskInput], {nullable:true})
    @Type(() => TaskCommentCreateWithoutTaskInput)
    create?: Array<TaskCommentCreateWithoutTaskInput>;

    @Field(() => [TaskCommentCreateOrConnectWithoutTaskInput], {nullable:true})
    @Type(() => TaskCommentCreateOrConnectWithoutTaskInput)
    connectOrCreate?: Array<TaskCommentCreateOrConnectWithoutTaskInput>;

    @Field(() => [TaskCommentUpsertWithWhereUniqueWithoutTaskInput], {nullable:true})
    @Type(() => TaskCommentUpsertWithWhereUniqueWithoutTaskInput)
    upsert?: Array<TaskCommentUpsertWithWhereUniqueWithoutTaskInput>;

    @Field(() => TaskCommentCreateManyTaskInputEnvelope, {nullable:true})
    @Type(() => TaskCommentCreateManyTaskInputEnvelope)
    createMany?: TaskCommentCreateManyTaskInputEnvelope;

    @Field(() => [TaskCommentWhereUniqueInput], {nullable:true})
    @Type(() => TaskCommentWhereUniqueInput)
    set?: Array<Prisma.AtLeast<TaskCommentWhereUniqueInput, 'id'>>;

    @Field(() => [TaskCommentWhereUniqueInput], {nullable:true})
    @Type(() => TaskCommentWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<TaskCommentWhereUniqueInput, 'id'>>;

    @Field(() => [TaskCommentWhereUniqueInput], {nullable:true})
    @Type(() => TaskCommentWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<TaskCommentWhereUniqueInput, 'id'>>;

    @Field(() => [TaskCommentWhereUniqueInput], {nullable:true})
    @Type(() => TaskCommentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<TaskCommentWhereUniqueInput, 'id'>>;

    @Field(() => [TaskCommentUpdateWithWhereUniqueWithoutTaskInput], {nullable:true})
    @Type(() => TaskCommentUpdateWithWhereUniqueWithoutTaskInput)
    update?: Array<TaskCommentUpdateWithWhereUniqueWithoutTaskInput>;

    @Field(() => [TaskCommentUpdateManyWithWhereWithoutTaskInput], {nullable:true})
    @Type(() => TaskCommentUpdateManyWithWhereWithoutTaskInput)
    updateMany?: Array<TaskCommentUpdateManyWithWhereWithoutTaskInput>;

    @Field(() => [TaskCommentScalarWhereInput], {nullable:true})
    @Type(() => TaskCommentScalarWhereInput)
    deleteMany?: Array<TaskCommentScalarWhereInput>;
}
