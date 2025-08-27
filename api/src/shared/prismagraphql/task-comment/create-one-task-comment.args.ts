import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TaskCommentCreateInput } from './task-comment-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneTaskCommentArgs {

    @Field(() => TaskCommentCreateInput, {nullable:false})
    @Type(() => TaskCommentCreateInput)
    data!: TaskCommentCreateInput;
}
