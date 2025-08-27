import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCreateNestedManyWithoutProjectInput } from '../task/task-create-nested-many-without-project.input';
import { ProjectMemberCreateNestedManyWithoutProjectInput } from '../project-member/project-member-create-nested-many-without-project.input';

@InputType()
export class ProjectCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => TaskCreateNestedManyWithoutProjectInput, {nullable:true})
    tasks?: TaskCreateNestedManyWithoutProjectInput;

    @Field(() => ProjectMemberCreateNestedManyWithoutProjectInput, {nullable:true})
    members?: ProjectMemberCreateNestedManyWithoutProjectInput;
}
