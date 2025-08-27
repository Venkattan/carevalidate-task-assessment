import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCommentCreateManyTaskInput } from './task-comment-create-many-task.input';
import { Type } from 'class-transformer';

@InputType()
export class TaskCommentCreateManyTaskInputEnvelope {

    @Field(() => [TaskCommentCreateManyTaskInput], {nullable:false})
    @Type(() => TaskCommentCreateManyTaskInput)
    data!: Array<TaskCommentCreateManyTaskInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
