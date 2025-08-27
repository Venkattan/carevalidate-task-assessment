import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ProjectMemberWhereUniqueInput } from './project-member-where-unique.input';
import { Type } from 'class-transformer';
import { ProjectMemberUpdateWithoutUserInput } from './project-member-update-without-user.input';

@InputType()
export class ProjectMemberUpdateWithWhereUniqueWithoutUserInput {

    @Field(() => ProjectMemberWhereUniqueInput, {nullable:false})
    @Type(() => ProjectMemberWhereUniqueInput)
    where!: Prisma.AtLeast<ProjectMemberWhereUniqueInput, 'id' | 'userId_projectId'>;

    @Field(() => ProjectMemberUpdateWithoutUserInput, {nullable:false})
    @Type(() => ProjectMemberUpdateWithoutUserInput)
    data!: ProjectMemberUpdateWithoutUserInput;
}
