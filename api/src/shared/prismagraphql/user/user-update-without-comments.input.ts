import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { TaskUpdateManyWithoutCreatorNestedInput } from '../task/task-update-many-without-creator-nested.input';
import { TaskUpdateManyWithoutAssigneeNestedInput } from '../task/task-update-many-without-assignee-nested.input';
import { ProjectMemberUpdateManyWithoutUserNestedInput } from '../project-member/project-member-update-many-without-user-nested.input';

@InputType()
export class UserUpdateWithoutCommentsInput {

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

    @Field(() => ProjectMemberUpdateManyWithoutUserNestedInput, {nullable:true})
    projects?: ProjectMemberUpdateManyWithoutUserNestedInput;
}
