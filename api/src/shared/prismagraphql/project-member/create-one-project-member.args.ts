import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProjectMemberCreateInput } from './project-member-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneProjectMemberArgs {

    @Field(() => ProjectMemberCreateInput, {nullable:false})
    @Type(() => ProjectMemberCreateInput)
    data!: ProjectMemberCreateInput;
}
