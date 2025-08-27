import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCommentCreateManyAuthorInput } from './task-comment-create-many-author.input';
import { Type } from 'class-transformer';

@InputType()
export class TaskCommentCreateManyAuthorInputEnvelope {

    @Field(() => [TaskCommentCreateManyAuthorInput], {nullable:false})
    @Type(() => TaskCommentCreateManyAuthorInput)
    data!: Array<TaskCommentCreateManyAuthorInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
