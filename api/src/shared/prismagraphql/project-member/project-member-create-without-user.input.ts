import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProjectCreateNestedOneWithoutMembersInput } from '../project/project-create-nested-one-without-members.input';

@InputType()
export class ProjectMemberCreateWithoutUserInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => ProjectCreateNestedOneWithoutMembersInput, {nullable:false})
    project!: ProjectCreateNestedOneWithoutMembersInput;
}
