import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { TaskUncheckedUpdateManyWithoutCreatorNestedInput } from '../task/task-unchecked-update-many-without-creator-nested.input';
import { TaskUncheckedUpdateManyWithoutAssigneeNestedInput } from '../task/task-unchecked-update-many-without-assignee-nested.input';
import { TaskCommentUncheckedUpdateManyWithoutAuthorNestedInput } from '../task-comment/task-comment-unchecked-update-many-without-author-nested.input';
import { ProjectMemberUncheckedUpdateManyWithoutUserNestedInput } from '../project-member/project-member-unchecked-update-many-without-user-nested.input';

@InputType()
export class UserUncheckedUpdateInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => TaskUncheckedUpdateManyWithoutCreatorNestedInput, {nullable:true})
    createdTasks?: TaskUncheckedUpdateManyWithoutCreatorNestedInput;

    @Field(() => TaskUncheckedUpdateManyWithoutAssigneeNestedInput, {nullable:true})
    assignedTasks?: TaskUncheckedUpdateManyWithoutAssigneeNestedInput;

    @Field(() => TaskCommentUncheckedUpdateManyWithoutAuthorNestedInput, {nullable:true})
    comments?: TaskCommentUncheckedUpdateManyWithoutAuthorNestedInput;

    @Field(() => ProjectMemberUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    projects?: ProjectMemberUncheckedUpdateManyWithoutUserNestedInput;
}
