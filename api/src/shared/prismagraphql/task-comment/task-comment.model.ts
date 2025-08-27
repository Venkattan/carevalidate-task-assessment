import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Task } from '../task/task.model';
import { User } from '../user/user.model';

@ObjectType()
export class TaskComment {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    content!: string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => String, {nullable:false})
    taskId!: string;

    @Field(() => String, {nullable:false})
    authorId!: string;

    @Field(() => Task, {nullable:false})
    task?: Task;

    @Field(() => User, {nullable:false})
    author?: User;
}
