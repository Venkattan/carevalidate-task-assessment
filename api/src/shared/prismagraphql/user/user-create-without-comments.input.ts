import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCreateNestedManyWithoutCreatorInput } from '../task/task-create-nested-many-without-creator.input';
import { TaskCreateNestedManyWithoutAssigneeInput } from '../task/task-create-nested-many-without-assignee.input';
import { ProjectMemberCreateNestedManyWithoutUserInput } from '../project-member/project-member-create-nested-many-without-user.input';

@InputType()
export class UserCreateWithoutCommentsInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => TaskCreateNestedManyWithoutCreatorInput, {nullable:true})
    createdTasks?: TaskCreateNestedManyWithoutCreatorInput;

    @Field(() => TaskCreateNestedManyWithoutAssigneeInput, {nullable:true})
    assignedTasks?: TaskCreateNestedManyWithoutAssigneeInput;

    @Field(() => ProjectMemberCreateNestedManyWithoutUserInput, {nullable:true})
    projects?: ProjectMemberCreateNestedManyWithoutUserInput;
}
