import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ProjectMemberWhereUniqueInput } from './project-member-where-unique.input';
import { Type } from 'class-transformer';
import { ProjectMemberCreateWithoutUserInput } from './project-member-create-without-user.input';

@InputType()
export class ProjectMemberCreateOrConnectWithoutUserInput {

    @Field(() => ProjectMemberWhereUniqueInput, {nullable:false})
    @Type(() => ProjectMemberWhereUniqueInput)
    where!: Prisma.AtLeast<ProjectMemberWhereUniqueInput, 'id' | 'userId_projectId'>;

    @Field(() => ProjectMemberCreateWithoutUserInput, {nullable:false})
    @Type(() => ProjectMemberCreateWithoutUserInput)
    create!: ProjectMemberCreateWithoutUserInput;
}
