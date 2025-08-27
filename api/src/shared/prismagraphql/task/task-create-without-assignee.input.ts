import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskStatus } from '../prisma/task-status.enum';
import { TaskPriority } from '../prisma/task-priority.enum';
import { UserCreateNestedOneWithoutCreatedTasksInput } from '../user/user-create-nested-one-without-created-tasks.input';
import { ProjectCreateNestedOneWithoutTasksInput } from '../project/project-create-nested-one-without-tasks.input';
import { TaskCommentCreateNestedManyWithoutTaskInput } from '../task-comment/task-comment-create-nested-many-without-task.input';

@InputType()
export class TaskCreateWithoutAssigneeInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => TaskStatus, {nullable:true})
    status?: `${TaskStatus}`;

    @Field(() => TaskPriority, {nullable:true})
    priority?: `${TaskPriority}`;

    @Field(() => Date, {nullable:true})
    dueDate?: Date | string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => UserCreateNestedOneWithoutCreatedTasksInput, {nullable:false})
    creator!: UserCreateNestedOneWithoutCreatedTasksInput;

    @Field(() => ProjectCreateNestedOneWithoutTasksInput, {nullable:false})
    project!: ProjectCreateNestedOneWithoutTasksInput;

    @Field(() => TaskCommentCreateNestedManyWithoutTaskInput, {nullable:true})
    comments?: TaskCommentCreateNestedManyWithoutTaskInput;
}
