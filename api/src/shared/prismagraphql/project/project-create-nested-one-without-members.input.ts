import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProjectCreateWithoutMembersInput } from './project-create-without-members.input';
import { Type } from 'class-transformer';
import { ProjectCreateOrConnectWithoutMembersInput } from './project-create-or-connect-without-members.input';
import { Prisma } from '@prisma/client';
import { ProjectWhereUniqueInput } from './project-where-unique.input';

@InputType()
export class ProjectCreateNestedOneWithoutMembersInput {

    @Field(() => ProjectCreateWithoutMembersInput, {nullable:true})
    @Type(() => ProjectCreateWithoutMembersInput)
    create?: ProjectCreateWithoutMembersInput;

    @Field(() => ProjectCreateOrConnectWithoutMembersInput, {nullable:true})
    @Type(() => ProjectCreateOrConnectWithoutMembersInput)
    connectOrCreate?: ProjectCreateOrConnectWithoutMembersInput;

    @Field(() => ProjectWhereUniqueInput, {nullable:true})
    @Type(() => ProjectWhereUniqueInput)
    connect?: Prisma.AtLeast<ProjectWhereUniqueInput, 'id'>;
}
