import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ProjectWhereUniqueInput } from './project-where-unique.input';
import { Type } from 'class-transformer';
import { ProjectCreateWithoutMembersInput } from './project-create-without-members.input';

@InputType()
export class ProjectCreateOrConnectWithoutMembersInput {

    @Field(() => ProjectWhereUniqueInput, {nullable:false})
    @Type(() => ProjectWhereUniqueInput)
    where!: Prisma.AtLeast<ProjectWhereUniqueInput, 'id'>;

    @Field(() => ProjectCreateWithoutMembersInput, {nullable:false})
    @Type(() => ProjectCreateWithoutMembersInput)
    create!: ProjectCreateWithoutMembersInput;
}
