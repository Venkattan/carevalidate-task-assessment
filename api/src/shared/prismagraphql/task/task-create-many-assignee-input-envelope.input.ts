import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCreateManyAssigneeInput } from './task-create-many-assignee.input';
import { Type } from 'class-transformer';

@InputType()
export class TaskCreateManyAssigneeInputEnvelope {

    @Field(() => [TaskCreateManyAssigneeInput], {nullable:false})
    @Type(() => TaskCreateManyAssigneeInput)
    data!: Array<TaskCreateManyAssigneeInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
