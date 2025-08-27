import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCommentCreateWithoutAuthorInput } from './task-comment-create-without-author.input';
import { Type } from 'class-transformer';
import { TaskCommentCreateOrConnectWithoutAuthorInput } from './task-comment-create-or-connect-without-author.input';
import { TaskCommentCreateManyAuthorInputEnvelope } from './task-comment-create-many-author-input-envelope.input';
import { Prisma } from '@prisma/client';
import { TaskCommentWhereUniqueInput } from './task-comment-where-unique.input';

@InputType()
export class TaskCommentUncheckedCreateNestedManyWithoutAuthorInput {

    @Field(() => [TaskCommentCreateWithoutAuthorInput], {nullable:true})
    @Type(() => TaskCommentCreateWithoutAuthorInput)
    create?: Array<TaskCommentCreateWithoutAuthorInput>;

    @Field(() => [TaskCommentCreateOrConnectWithoutAuthorInput], {nullable:true})
    @Type(() => TaskCommentCreateOrConnectWithoutAuthorInput)
    connectOrCreate?: Array<TaskCommentCreateOrConnectWithoutAuthorInput>;

    @Field(() => TaskCommentCreateManyAuthorInputEnvelope, {nullable:true})
    @Type(() => TaskCommentCreateManyAuthorInputEnvelope)
    createMany?: TaskCommentCreateManyAuthorInputEnvelope;

    @Field(() => [TaskCommentWhereUniqueInput], {nullable:true})
    @Type(() => TaskCommentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<TaskCommentWhereUniqueInput, 'id'>>;
}
