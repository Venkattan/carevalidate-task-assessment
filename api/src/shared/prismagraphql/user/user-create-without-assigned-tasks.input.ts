import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCreateNestedManyWithoutCreatorInput } from '../task/task-create-nested-many-without-creator.input';
import { TaskCommentCreateNestedManyWithoutAuthorInput } from '../task-comment/task-comment-create-nested-many-without-author.input';
import { ProjectMemberCreateNestedManyWithoutUserInput } from '../project-member/project-member-create-nested-many-without-user.input';

@InputType()
export class UserCreateWithoutAssignedTasksInput {

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

    @Field(() => TaskCommentCreateNestedManyWithoutAuthorInput, {nullable:true})
    comments?: TaskCommentCreateNestedManyWithoutAuthorInput;

    @Field(() => ProjectMemberCreateNestedManyWithoutUserInput, {nullable:true})
    projects?: ProjectMemberCreateNestedManyWithoutUserInput;
}
