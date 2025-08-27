import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { EnumTaskStatusFieldUpdateOperationsInput } from '../prisma/enum-task-status-field-update-operations.input';
import { EnumTaskPriorityFieldUpdateOperationsInput } from '../prisma/enum-task-priority-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { TaskCommentUncheckedUpdateManyWithoutTaskNestedInput } from '../task-comment/task-comment-unchecked-update-many-without-task-nested.input';

@InputType()
export class TaskUncheckedUpdateWithoutCreatorInput {

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

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    assignedTo?: NullableStringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    projectId?: StringFieldUpdateOperationsInput;

    @Field(() => TaskCommentUncheckedUpdateManyWithoutTaskNestedInput, {nullable:true})
    comments?: TaskCommentUncheckedUpdateManyWithoutTaskNestedInput;
}
