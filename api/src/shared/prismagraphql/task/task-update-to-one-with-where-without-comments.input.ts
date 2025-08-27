import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskWhereInput } from './task-where.input';
import { Type } from 'class-transformer';
import { TaskUpdateWithoutCommentsInput } from './task-update-without-comments.input';

@InputType()
export class TaskUpdateToOneWithWhereWithoutCommentsInput {

    @Field(() => TaskWhereInput, {nullable:true})
    @Type(() => TaskWhereInput)
    where?: TaskWhereInput;

    @Field(() => TaskUpdateWithoutCommentsInput, {nullable:false})
    @Type(() => TaskUpdateWithoutCommentsInput)
    data!: TaskUpdateWithoutCommentsInput;
}
