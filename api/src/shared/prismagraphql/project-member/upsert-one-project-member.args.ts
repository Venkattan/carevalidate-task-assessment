import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ProjectMemberWhereUniqueInput } from './project-member-where-unique.input';
import { Type } from 'class-transformer';
import { ProjectMemberCreateInput } from './project-member-create.input';
import { ProjectMemberUpdateInput } from './project-member-update.input';

@ArgsType()
export class UpsertOneProjectMemberArgs {

    @Field(() => ProjectMemberWhereUniqueInput, {nullable:false})
    @Type(() => ProjectMemberWhereUniqueInput)
    where!: Prisma.AtLeast<ProjectMemberWhereUniqueInput, 'id' | 'userId_projectId'>;

    @Field(() => ProjectMemberCreateInput, {nullable:false})
    @Type(() => ProjectMemberCreateInput)
    create!: ProjectMemberCreateInput;

    @Field(() => ProjectMemberUpdateInput, {nullable:false})
    @Type(() => ProjectMemberUpdateInput)
    update!: ProjectMemberUpdateInput;
}
