import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskUncheckedCreateNestedManyWithoutCreatorInput } from '../task/task-unchecked-create-nested-many-without-creator.input';
import { TaskCommentUncheckedCreateNestedManyWithoutAuthorInput } from '../task-comment/task-comment-unchecked-create-nested-many-without-author.input';
import { ProjectMemberUncheckedCreateNestedManyWithoutUserInput } from '../project-member/project-member-unchecked-create-nested-many-without-user.input';

@InputType()
export class UserUncheckedCreateWithoutAssignedTasksInput {

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

    @Field(() => TaskUncheckedCreateNestedManyWithoutCreatorInput, {nullable:true})
    createdTasks?: TaskUncheckedCreateNestedManyWithoutCreatorInput;

    @Field(() => TaskCommentUncheckedCreateNestedManyWithoutAuthorInput, {nullable:true})
    comments?: TaskCommentUncheckedCreateNestedManyWithoutAuthorInput;

    @Field(() => ProjectMemberUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    projects?: ProjectMemberUncheckedCreateNestedManyWithoutUserInput;
}
