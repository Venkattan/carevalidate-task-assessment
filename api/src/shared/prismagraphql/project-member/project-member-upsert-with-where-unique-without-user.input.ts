import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ProjectMemberWhereUniqueInput } from './project-member-where-unique.input';
import { Type } from 'class-transformer';
import { ProjectMemberUpdateWithoutUserInput } from './project-member-update-without-user.input';
import { ProjectMemberCreateWithoutUserInput } from './project-member-create-without-user.input';

@InputType()
export class ProjectMemberUpsertWithWhereUniqueWithoutUserInput {

    @Field(() => ProjectMemberWhereUniqueInput, {nullable:false})
    @Type(() => ProjectMemberWhereUniqueInput)
    where!: Prisma.AtLeast<ProjectMemberWhereUniqueInput, 'id' | 'userId_projectId'>;

    @Field(() => ProjectMemberUpdateWithoutUserInput, {nullable:false})
    @Type(() => ProjectMemberUpdateWithoutUserInput)
    update!: ProjectMemberUpdateWithoutUserInput;

    @Field(() => ProjectMemberCreateWithoutUserInput, {nullable:false})
    @Type(() => ProjectMemberCreateWithoutUserInput)
    create!: ProjectMemberCreateWithoutUserInput;
}
