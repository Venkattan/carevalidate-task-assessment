import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProjectMemberCreateWithoutUserInput } from './project-member-create-without-user.input';
import { Type } from 'class-transformer';
import { ProjectMemberCreateOrConnectWithoutUserInput } from './project-member-create-or-connect-without-user.input';
import { ProjectMemberUpsertWithWhereUniqueWithoutUserInput } from './project-member-upsert-with-where-unique-without-user.input';
import { ProjectMemberCreateManyUserInputEnvelope } from './project-member-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ProjectMemberWhereUniqueInput } from './project-member-where-unique.input';
import { ProjectMemberUpdateWithWhereUniqueWithoutUserInput } from './project-member-update-with-where-unique-without-user.input';
import { ProjectMemberUpdateManyWithWhereWithoutUserInput } from './project-member-update-many-with-where-without-user.input';
import { ProjectMemberScalarWhereInput } from './project-member-scalar-where.input';

@InputType()
export class ProjectMemberUpdateManyWithoutUserNestedInput {

    @Field(() => [ProjectMemberCreateWithoutUserInput], {nullable:true})
    @Type(() => ProjectMemberCreateWithoutUserInput)
    create?: Array<ProjectMemberCreateWithoutUserInput>;

    @Field(() => [ProjectMemberCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => ProjectMemberCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<ProjectMemberCreateOrConnectWithoutUserInput>;

    @Field(() => [ProjectMemberUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => ProjectMemberUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<ProjectMemberUpsertWithWhereUniqueWithoutUserInput>;

    @Field(() => ProjectMemberCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => ProjectMemberCreateManyUserInputEnvelope)
    createMany?: ProjectMemberCreateManyUserInputEnvelope;

    @Field(() => [ProjectMemberWhereUniqueInput], {nullable:true})
    @Type(() => ProjectMemberWhereUniqueInput)
    set?: Array<Prisma.AtLeast<ProjectMemberWhereUniqueInput, 'id' | 'userId_projectId'>>;

    @Field(() => [ProjectMemberWhereUniqueInput], {nullable:true})
    @Type(() => ProjectMemberWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<ProjectMemberWhereUniqueInput, 'id' | 'userId_projectId'>>;

    @Field(() => [ProjectMemberWhereUniqueInput], {nullable:true})
    @Type(() => ProjectMemberWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<ProjectMemberWhereUniqueInput, 'id' | 'userId_projectId'>>;

    @Field(() => [ProjectMemberWhereUniqueInput], {nullable:true})
    @Type(() => ProjectMemberWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ProjectMemberWhereUniqueInput, 'id' | 'userId_projectId'>>;

    @Field(() => [ProjectMemberUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => ProjectMemberUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<ProjectMemberUpdateWithWhereUniqueWithoutUserInput>;

    @Field(() => [ProjectMemberUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => ProjectMemberUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<ProjectMemberUpdateManyWithWhereWithoutUserInput>;

    @Field(() => [ProjectMemberScalarWhereInput], {nullable:true})
    @Type(() => ProjectMemberScalarWhereInput)
    deleteMany?: Array<ProjectMemberScalarWhereInput>;
}
