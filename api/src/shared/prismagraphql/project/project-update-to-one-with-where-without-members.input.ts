import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProjectWhereInput } from './project-where.input';
import { Type } from 'class-transformer';
import { ProjectUpdateWithoutMembersInput } from './project-update-without-members.input';

@InputType()
export class ProjectUpdateToOneWithWhereWithoutMembersInput {

    @Field(() => ProjectWhereInput, {nullable:true})
    @Type(() => ProjectWhereInput)
    where?: ProjectWhereInput;

    @Field(() => ProjectUpdateWithoutMembersInput, {nullable:false})
    @Type(() => ProjectUpdateWithoutMembersInput)
    data!: ProjectUpdateWithoutMembersInput;
}
