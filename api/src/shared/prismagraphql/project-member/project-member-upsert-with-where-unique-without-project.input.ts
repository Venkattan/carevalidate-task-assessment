import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ProjectMemberWhereUniqueInput } from './project-member-where-unique.input';
import { Type } from 'class-transformer';
import { ProjectMemberUpdateWithoutProjectInput } from './project-member-update-without-project.input';
import { ProjectMemberCreateWithoutProjectInput } from './project-member-create-without-project.input';

@InputType()
export class ProjectMemberUpsertWithWhereUniqueWithoutProjectInput {

    @Field(() => ProjectMemberWhereUniqueInput, {nullable:false})
    @Type(() => ProjectMemberWhereUniqueInput)
    where!: Prisma.AtLeast<ProjectMemberWhereUniqueInput, 'id' | 'userId_projectId'>;

    @Field(() => ProjectMemberUpdateWithoutProjectInput, {nullable:false})
    @Type(() => ProjectMemberUpdateWithoutProjectInput)
    update!: ProjectMemberUpdateWithoutProjectInput;

    @Field(() => ProjectMemberCreateWithoutProjectInput, {nullable:false})
    @Type(() => ProjectMemberCreateWithoutProjectInput)
    create!: ProjectMemberCreateWithoutProjectInput;
}
