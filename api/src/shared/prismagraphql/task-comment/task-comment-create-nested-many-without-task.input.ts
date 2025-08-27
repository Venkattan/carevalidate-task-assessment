import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCommentCreateWithoutTaskInput } from './task-comment-create-without-task.input';
import { Type } from 'class-transformer';
import { TaskCommentCreateOrConnectWithoutTaskInput } from './task-comment-create-or-connect-without-task.input';
import { TaskCommentCreateManyTaskInputEnvelope } from './task-comment-create-many-task-input-envelope.input';
import { Prisma } from '@prisma/client';
import { TaskCommentWhereUniqueInput } from './task-comment-where-unique.input';

@InputType()
export class TaskCommentCreateNestedManyWithoutTaskInput {

    @Field(() => [TaskCommentCreateWithoutTaskInput], {nullable:true})
    @Type(() => TaskCommentCreateWithoutTaskInput)
    create?: Array<TaskCommentCreateWithoutTaskInput>;

    @Field(() => [TaskCommentCreateOrConnectWithoutTaskInput], {nullable:true})
    @Type(() => TaskCommentCreateOrConnectWithoutTaskInput)
    connectOrCreate?: Array<TaskCommentCreateOrConnectWithoutTaskInput>;

    @Field(() => TaskCommentCreateManyTaskInputEnvelope, {nullable:true})
    @Type(() => TaskCommentCreateManyTaskInputEnvelope)
    createMany?: TaskCommentCreateManyTaskInputEnvelope;

    @Field(() => [TaskCommentWhereUniqueInput], {nullable:true})
    @Type(() => TaskCommentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<TaskCommentWhereUniqueInput, 'id'>>;
}
