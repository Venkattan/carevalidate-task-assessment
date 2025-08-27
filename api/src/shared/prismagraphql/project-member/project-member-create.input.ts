import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutProjectsInput } from '../user/user-create-nested-one-without-projects.input';
import { ProjectCreateNestedOneWithoutMembersInput } from '../project/project-create-nested-one-without-members.input';

@InputType()
export class ProjectMemberCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => UserCreateNestedOneWithoutProjectsInput, {nullable:false})
    user!: UserCreateNestedOneWithoutProjectsInput;

    @Field(() => ProjectCreateNestedOneWithoutMembersInput, {nullable:false})
    project!: ProjectCreateNestedOneWithoutMembersInput;
}
