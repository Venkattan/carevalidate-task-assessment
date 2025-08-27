import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProjectCreateWithoutMembersInput } from './project-create-without-members.input';
import { Type } from 'class-transformer';
import { ProjectCreateOrConnectWithoutMembersInput } from './project-create-or-connect-without-members.input';
import { ProjectUpsertWithoutMembersInput } from './project-upsert-without-members.input';
import { Prisma } from '@prisma/client';
import { ProjectWhereUniqueInput } from './project-where-unique.input';
import { ProjectUpdateToOneWithWhereWithoutMembersInput } from './project-update-to-one-with-where-without-members.input';

@InputType()
export class ProjectUpdateOneRequiredWithoutMembersNestedInput {

    @Field(() => ProjectCreateWithoutMembersInput, {nullable:true})
    @Type(() => ProjectCreateWithoutMembersInput)
    create?: ProjectCreateWithoutMembersInput;

    @Field(() => ProjectCreateOrConnectWithoutMembersInput, {nullable:true})
    @Type(() => ProjectCreateOrConnectWithoutMembersInput)
    connectOrCreate?: ProjectCreateOrConnectWithoutMembersInput;

    @Field(() => ProjectUpsertWithoutMembersInput, {nullable:true})
    @Type(() => ProjectUpsertWithoutMembersInput)
    upsert?: ProjectUpsertWithoutMembersInput;

    @Field(() => ProjectWhereUniqueInput, {nullable:true})
    @Type(() => ProjectWhereUniqueInput)
    connect?: Prisma.AtLeast<ProjectWhereUniqueInput, 'id'>;

    @Field(() => ProjectUpdateToOneWithWhereWithoutMembersInput, {nullable:true})
    @Type(() => ProjectUpdateToOneWithWhereWithoutMembersInput)
    update?: ProjectUpdateToOneWithWhereWithoutMembersInput;
}
