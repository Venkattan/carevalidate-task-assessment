import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskPriority } from './task-priority.enum';

@InputType()
export class EnumTaskPriorityFieldUpdateOperationsInput {

    @Field(() => TaskPriority, {nullable:true})
    set?: `${TaskPriority}`;
}
