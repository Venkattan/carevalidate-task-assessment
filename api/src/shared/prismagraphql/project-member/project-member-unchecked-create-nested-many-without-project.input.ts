import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProjectMemberCreateWithoutProjectInput } from './project-member-create-without-project.input';
import { Type } from 'class-transformer';
import { ProjectMemberCreateOrConnectWithoutProjectInput } from './project-member-create-or-connect-without-project.input';
import { ProjectMemberCreateManyProjectInputEnvelope } from './project-member-create-many-project-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ProjectMemberWhereUniqueInput } from './project-member-where-unique.input';

@InputType()
export class ProjectMemberUncheckedCreateNestedManyWithoutProjectInput {

    @Field(() => [ProjectMemberCreateWithoutProjectInput], {nullable:true})
    @Type(() => ProjectMemberCreateWithoutProjectInput)
    create?: Array<ProjectMemberCreateWithoutProjectInput>;

    @Field(() => [ProjectMemberCreateOrConnectWithoutProjectInput], {nullable:true})
    @Type(() => ProjectMemberCreateOrConnectWithoutProjectInput)
    connectOrCreate?: Array<ProjectMemberCreateOrConnectWithoutProjectInput>;

    @Field(() => ProjectMemberCreateManyProjectInputEnvelope, {nullable:true})
    @Type(() => ProjectMemberCreateManyProjectInputEnvelope)
    createMany?: ProjectMemberCreateManyProjectInputEnvelope;

    @Field(() => [ProjectMemberWhereUniqueInput], {nullable:true})
    @Type(() => ProjectMemberWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ProjectMemberWhereUniqueInput, 'id' | 'userId_projectId'>>;
}
