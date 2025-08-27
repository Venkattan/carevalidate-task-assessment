import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TaskCommentCreateManyInput } from './task-comment-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyTaskCommentArgs {

    @Field(() => [TaskCommentCreateManyInput], {nullable:false})
    @Type(() => TaskCommentCreateManyInput)
    data!: Array<TaskCommentCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
