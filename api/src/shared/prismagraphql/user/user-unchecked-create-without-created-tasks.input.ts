import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskUncheckedCreateNestedManyWithoutAssigneeInput } from '../task/task-unchecked-create-nested-many-without-assignee.input';
import { TaskCommentUncheckedCreateNestedManyWithoutAuthorInput } from '../task-comment/task-comment-unchecked-create-nested-many-without-author.input';
import { ProjectMemberUncheckedCreateNestedManyWithoutUserInput } from '../project-member/project-member-unchecked-create-nested-many-without-user.input';

@InputType()
export class UserUncheckedCreateWithoutCreatedTasksInput {

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

    @Field(() => TaskUncheckedCreateNestedManyWithoutAssigneeInput, {nullable:true})
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutAssigneeInput;

    @Field(() => TaskCommentUncheckedCreateNestedManyWithoutAuthorInput, {nullable:true})
    comments?: TaskCommentUncheckedCreateNestedManyWithoutAuthorInput;

    @Field(() => ProjectMemberUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    projects?: ProjectMemberUncheckedCreateNestedManyWithoutUserInput;
}
