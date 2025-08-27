import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskWhereInput } from './task-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { EnumTaskStatusFilter } from '../prisma/enum-task-status-filter.input';
import { EnumTaskPriorityFilter } from '../prisma/enum-task-priority-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { UserScalarRelationFilter } from '../user/user-scalar-relation-filter.input';
import { UserNullableScalarRelationFilter } from '../user/user-nullable-scalar-relation-filter.input';
import { ProjectScalarRelationFilter } from '../project/project-scalar-relation-filter.input';
import { TaskCommentListRelationFilter } from '../task-comment/task-comment-list-relation-filter.input';

@InputType()
export class TaskWhereUniqueInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => [TaskWhereInput], {nullable:true})
    AND?: Array<TaskWhereInput>;

    @Field(() => [TaskWhereInput], {nullable:true})
    OR?: Array<TaskWhereInput>;

    @Field(() => [TaskWhereInput], {nullable:true})
    NOT?: Array<TaskWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    title?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    description?: StringNullableFilter;

    @Field(() => EnumTaskStatusFilter, {nullable:true})
    status?: EnumTaskStatusFilter;

    @Field(() => EnumTaskPriorityFilter, {nullable:true})
    priority?: EnumTaskPriorityFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    dueDate?: DateTimeNullableFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;

    @Field(() => StringFilter, {nullable:true})
    createdBy?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    assignedTo?: StringNullableFilter;

    @Field(() => StringFilter, {nullable:true})
    projectId?: StringFilter;

    @Field(() => UserScalarRelationFilter, {nullable:true})
    creator?: UserScalarRelationFilter;

    @Field(() => UserNullableScalarRelationFilter, {nullable:true})
    assignee?: UserNullableScalarRelationFilter;

    @Field(() => ProjectScalarRelationFilter, {nullable:true})
    project?: ProjectScalarRelationFilter;

    @Field(() => TaskCommentListRelationFilter, {nullable:true})
    comments?: TaskCommentListRelationFilter;
}
