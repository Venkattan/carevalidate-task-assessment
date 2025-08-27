import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProjectMemberCreateWithoutUserInput } from './project-member-create-without-user.input';
import { Type } from 'class-transformer';
import { ProjectMemberCreateOrConnectWithoutUserInput } from './project-member-create-or-connect-without-user.input';
import { ProjectMemberCreateManyUserInputEnvelope } from './project-member-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ProjectMemberWhereUniqueInput } from './project-member-where-unique.input';

@InputType()
export class ProjectMemberUncheckedCreateNestedManyWithoutUserInput {

    @Field(() => [ProjectMemberCreateWithoutUserInput], {nullable:true})
    @Type(() => ProjectMemberCreateWithoutUserInput)
    create?: Array<ProjectMemberCreateWithoutUserInput>;

    @Field(() => [ProjectMemberCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => ProjectMemberCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<ProjectMemberCreateOrConnectWithoutUserInput>;

    @Field(() => ProjectMemberCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => ProjectMemberCreateManyUserInputEnvelope)
    createMany?: ProjectMemberCreateManyUserInputEnvelope;

    @Field(() => [ProjectMemberWhereUniqueInput], {nullable:true})
    @Type(() => ProjectMemberWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ProjectMemberWhereUniqueInput, 'id' | 'userId_projectId'>>;
}
