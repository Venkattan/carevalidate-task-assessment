import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskUpdateWithoutCommentsInput } from './task-update-without-comments.input';
import { Type } from 'class-transformer';
import { TaskCreateWithoutCommentsInput } from './task-create-without-comments.input';
import { TaskWhereInput } from './task-where.input';

@InputType()
export class TaskUpsertWithoutCommentsInput {

    @Field(() => TaskUpdateWithoutCommentsInput, {nullable:false})
    @Type(() => TaskUpdateWithoutCommentsInput)
    update!: TaskUpdateWithoutCommentsInput;

    @Field(() => TaskCreateWithoutCommentsInput, {nullable:false})
    @Type(() => TaskCreateWithoutCommentsInput)
    create!: TaskCreateWithoutCommentsInput;

    @Field(() => TaskWhereInput, {nullable:true})
    @Type(() => TaskWhereInput)
    where?: TaskWhereInput;
}
