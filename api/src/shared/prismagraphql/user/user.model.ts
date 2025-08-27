import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Task } from '../task/task.model';
import { TaskComment } from '../task-comment/task-comment.model';
import { ProjectMember } from '../project-member/project-member.model';
import { UserCount } from './user-count.output';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => [Task], {nullable:true})
    createdTasks?: Array<Task>;

    @Field(() => [Task], {nullable:true})
    assignedTasks?: Array<Task>;

    @Field(() => [TaskComment], {nullable:true})
    comments?: Array<TaskComment>;

    @Field(() => [ProjectMember], {nullable:true})
    projects?: Array<ProjectMember>;

    @Field(() => UserCount, {nullable:false})
    _count?: UserCount;
}
