import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { TaskUpdateOneRequiredWithoutCommentsNestedInput } from '../task/task-update-one-required-without-comments-nested.input';

@InputType()
export class TaskCommentUpdateWithoutAuthorInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    content?: StringFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => TaskUpdateOneRequiredWithoutCommentsNestedInput, {nullable:true})
    task?: TaskUpdateOneRequiredWithoutCommentsNestedInput;
}
