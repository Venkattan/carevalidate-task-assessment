import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskStatus } from './task-status.enum';

@InputType()
export class EnumTaskStatusFieldUpdateOperationsInput {

    @Field(() => TaskStatus, {nullable:true})
    set?: `${TaskStatus}`;
}
