import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProjectMemberCreateWithoutProjectInput } from './project-member-create-without-project.input';
import { Type } from 'class-transformer';
import { ProjectMemberCreateOrConnectWithoutProjectInput } from './project-member-create-or-connect-without-project.input';
import { ProjectMemberUpsertWithWhereUniqueWithoutProjectInput } from './project-member-upsert-with-where-unique-without-project.input';
import { ProjectMemberCreateManyProjectInputEnvelope } from './project-member-create-many-project-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ProjectMemberWhereUniqueInput } from './project-member-where-unique.input';
import { ProjectMemberUpdateWithWhereUniqueWithoutProjectInput } from './project-member-update-with-where-unique-without-project.input';
import { ProjectMemberUpdateManyWithWhereWithoutProjectInput } from './project-member-update-many-with-where-without-project.input';
import { ProjectMemberScalarWhereInput } from './project-member-scalar-where.input';

@InputType()
export class ProjectMemberUncheckedUpdateManyWithoutProjectNestedInput {

    @Field(() => [ProjectMemberCreateWithoutProjectInput], {nullable:true})
    @Type(() => ProjectMemberCreateWithoutProjectInput)
    create?: Array<ProjectMemberCreateWithoutProjectInput>;

    @Field(() => [ProjectMemberCreateOrConnectWithoutProjectInput], {nullable:true})
    @Type(() => ProjectMemberCreateOrConnectWithoutProjectInput)
    connectOrCreate?: Array<ProjectMemberCreateOrConnectWithoutProjectInput>;

    @Field(() => [ProjectMemberUpsertWithWhereUniqueWithoutProjectInput], {nullable:true})
    @Type(() => ProjectMemberUpsertWithWhereUniqueWithoutProjectInput)
    upsert?: Array<ProjectMemberUpsertWithWhereUniqueWithoutProjectInput>;

    @Field(() => ProjectMemberCreateManyProjectInputEnvelope, {nullable:true})
    @Type(() => ProjectMemberCreateManyProjectInputEnvelope)
    createMany?: ProjectMemberCreateManyProjectInputEnvelope;

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

    @Field(() => [ProjectMemberUpdateWithWhereUniqueWithoutProjectInput], {nullable:true})
    @Type(() => ProjectMemberUpdateWithWhereUniqueWithoutProjectInput)
    update?: Array<ProjectMemberUpdateWithWhereUniqueWithoutProjectInput>;

    @Field(() => [ProjectMemberUpdateManyWithWhereWithoutProjectInput], {nullable:true})
    @Type(() => ProjectMemberUpdateManyWithWhereWithoutProjectInput)
    updateMany?: Array<ProjectMemberUpdateManyWithWhereWithoutProjectInput>;

    @Field(() => [ProjectMemberScalarWhereInput], {nullable:true})
    @Type(() => ProjectMemberScalarWhereInput)
    deleteMany?: Array<ProjectMemberScalarWhereInput>;
}
