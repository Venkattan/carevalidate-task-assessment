import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProjectMemberUpdateInput } from './project-member-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { ProjectMemberWhereUniqueInput } from './project-member-where-unique.input';

@ArgsType()
export class UpdateOneProjectMemberArgs {

    @Field(() => ProjectMemberUpdateInput, {nullable:false})
    @Type(() => ProjectMemberUpdateInput)
    data!: ProjectMemberUpdateInput;

    @Field(() => ProjectMemberWhereUniqueInput, {nullable:false})
    @Type(() => ProjectMemberWhereUniqueInput)
    where!: Prisma.AtLeast<ProjectMemberWhereUniqueInput, 'id' | 'userId_projectId'>;
}
