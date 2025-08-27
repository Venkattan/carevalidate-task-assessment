import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { TaskListRelationFilter } from '../task/task-list-relation-filter.input';
import { TaskCommentListRelationFilter } from '../task-comment/task-comment-list-relation-filter.input';
import { ProjectMemberListRelationFilter } from '../project-member/project-member-list-relation-filter.input';

@InputType()
export class UserWhereInput {

    @Field(() => [UserWhereInput], {nullable:true})
    AND?: Array<UserWhereInput>;

    @Field(() => [UserWhereInput], {nullable:true})
    OR?: Array<UserWhereInput>;

    @Field(() => [UserWhereInput], {nullable:true})
    NOT?: Array<UserWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    email?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    password?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;

    @Field(() => TaskListRelationFilter, {nullable:true})
    createdTasks?: TaskListRelationFilter;

    @Field(() => TaskListRelationFilter, {nullable:true})
    assignedTasks?: TaskListRelationFilter;

    @Field(() => TaskCommentListRelationFilter, {nullable:true})
    comments?: TaskCommentListRelationFilter;

    @Field(() => ProjectMemberListRelationFilter, {nullable:true})
    projects?: ProjectMemberListRelationFilter;
}
