import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { TaskUpdateManyWithoutCreatorNestedInput } from '../task/task-update-many-without-creator-nested.input';
import { TaskUpdateManyWithoutAssigneeNestedInput } from '../task/task-update-many-without-assignee-nested.input';
import { TaskCommentUpdateManyWithoutAuthorNestedInput } from '../task-comment/task-comment-update-many-without-author-nested.input';

@InputType()
export class UserUpdateWithoutProjectsInput {

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

    @Field(() => TaskUpdateManyWithoutCreatorNestedInput, {nullable:true})
    createdTasks?: TaskUpdateManyWithoutCreatorNestedInput;

    @Field(() => TaskUpdateManyWithoutAssigneeNestedInput, {nullable:true})
    assignedTasks?: TaskUpdateManyWithoutAssigneeNestedInput;

    @Field(() => TaskCommentUpdateManyWithoutAuthorNestedInput, {nullable:true})
    comments?: TaskCommentUpdateManyWithoutAuthorNestedInput;
}
