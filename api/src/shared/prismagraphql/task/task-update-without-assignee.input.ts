import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { EnumTaskStatusFieldUpdateOperationsInput } from '../prisma/enum-task-status-field-update-operations.input';
import { EnumTaskPriorityFieldUpdateOperationsInput } from '../prisma/enum-task-priority-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { UserUpdateOneRequiredWithoutCreatedTasksNestedInput } from '../user/user-update-one-required-without-created-tasks-nested.input';
import { ProjectUpdateOneRequiredWithoutTasksNestedInput } from '../project/project-update-one-required-without-tasks-nested.input';
import { TaskCommentUpdateManyWithoutTaskNestedInput } from '../task-comment/task-comment-update-many-without-task-nested.input';

@InputType()
export class TaskUpdateWithoutAssigneeInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    title?: StringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    description?: NullableStringFieldUpdateOperationsInput;

    @Field(() => EnumTaskStatusFieldUpdateOperationsInput, {nullable:true})
    status?: EnumTaskStatusFieldUpdateOperationsInput;

    @Field(() => EnumTaskPriorityFieldUpdateOperationsInput, {nullable:true})
    priority?: EnumTaskPriorityFieldUpdateOperationsInput;

    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    dueDate?: NullableDateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => UserUpdateOneRequiredWithoutCreatedTasksNestedInput, {nullable:true})
    creator?: UserUpdateOneRequiredWithoutCreatedTasksNestedInput;

    @Field(() => ProjectUpdateOneRequiredWithoutTasksNestedInput, {nullable:true})
    project?: ProjectUpdateOneRequiredWithoutTasksNestedInput;

    @Field(() => TaskCommentUpdateManyWithoutTaskNestedInput, {nullable:true})
    comments?: TaskCommentUpdateManyWithoutTaskNestedInput;
}
