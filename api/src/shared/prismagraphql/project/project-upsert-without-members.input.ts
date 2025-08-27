import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProjectUpdateWithoutMembersInput } from './project-update-without-members.input';
import { Type } from 'class-transformer';
import { ProjectCreateWithoutMembersInput } from './project-create-without-members.input';
import { ProjectWhereInput } from './project-where.input';

@InputType()
export class ProjectUpsertWithoutMembersInput {

    @Field(() => ProjectUpdateWithoutMembersInput, {nullable:false})
    @Type(() => ProjectUpdateWithoutMembersInput)
    update!: ProjectUpdateWithoutMembersInput;

    @Field(() => ProjectCreateWithoutMembersInput, {nullable:false})
    @Type(() => ProjectCreateWithoutMembersInput)
    create!: ProjectCreateWithoutMembersInput;

    @Field(() => ProjectWhereInput, {nullable:true})
    @Type(() => ProjectWhereInput)
    where?: ProjectWhereInput;
}
