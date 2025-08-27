import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCommentCreateWithoutAuthorInput } from './task-comment-create-without-author.input';
import { Type } from 'class-transformer';
import { TaskCommentCreateOrConnectWithoutAuthorInput } from './task-comment-create-or-connect-without-author.input';
import { TaskCommentUpsertWithWhereUniqueWithoutAuthorInput } from './task-comment-upsert-with-where-unique-without-author.input';
import { TaskCommentCreateManyAuthorInputEnvelope } from './task-comment-create-many-author-input-envelope.input';
import { Prisma } from '@prisma/client';
import { TaskCommentWhereUniqueInput } from './task-comment-where-unique.input';
import { TaskCommentUpdateWithWhereUniqueWithoutAuthorInput } from './task-comment-update-with-where-unique-without-author.input';
import { TaskCommentUpdateManyWithWhereWithoutAuthorInput } from './task-comment-update-many-with-where-without-author.input';
import { TaskCommentScalarWhereInput } from './task-comment-scalar-where.input';

@InputType()
export class TaskCommentUpdateManyWithoutAuthorNestedInput {

    @Field(() => [TaskCommentCreateWithoutAuthorInput], {nullable:true})
    @Type(() => TaskCommentCreateWithoutAuthorInput)
    create?: Array<TaskCommentCreateWithoutAuthorInput>;

    @Field(() => [TaskCommentCreateOrConnectWithoutAuthorInput], {nullable:true})
    @Type(() => TaskCommentCreateOrConnectWithoutAuthorInput)
    connectOrCreate?: Array<TaskCommentCreateOrConnectWithoutAuthorInput>;

    @Field(() => [TaskCommentUpsertWithWhereUniqueWithoutAuthorInput], {nullable:true})
    @Type(() => TaskCommentUpsertWithWhereUniqueWithoutAuthorInput)
    upsert?: Array<TaskCommentUpsertWithWhereUniqueWithoutAuthorInput>;

    @Field(() => TaskCommentCreateManyAuthorInputEnvelope, {nullable:true})
    @Type(() => TaskCommentCreateManyAuthorInputEnvelope)
    createMany?: TaskCommentCreateManyAuthorInputEnvelope;

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

    @Field(() => [TaskCommentUpdateWithWhereUniqueWithoutAuthorInput], {nullable:true})
    @Type(() => TaskCommentUpdateWithWhereUniqueWithoutAuthorInput)
    update?: Array<TaskCommentUpdateWithWhereUniqueWithoutAuthorInput>;

    @Field(() => [TaskCommentUpdateManyWithWhereWithoutAuthorInput], {nullable:true})
    @Type(() => TaskCommentUpdateManyWithWhereWithoutAuthorInput)
    updateMany?: Array<TaskCommentUpdateManyWithWhereWithoutAuthorInput>;

    @Field(() => [TaskCommentScalarWhereInput], {nullable:true})
    @Type(() => TaskCommentScalarWhereInput)
    deleteMany?: Array<TaskCommentScalarWhereInput>;
}
