import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { TaskScalarRelationFilter } from '../task/task-scalar-relation-filter.input';
import { UserScalarRelationFilter } from '../user/user-scalar-relation-filter.input';

@InputType()
export class TaskCommentWhereInput {

    @Field(() => [TaskCommentWhereInput], {nullable:true})
    AND?: Array<TaskCommentWhereInput>;

    @Field(() => [TaskCommentWhereInput], {nullable:true})
    OR?: Array<TaskCommentWhereInput>;

    @Field(() => [TaskCommentWhereInput], {nullable:true})
    NOT?: Array<TaskCommentWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    content?: StringFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => StringFilter, {nullable:true})
    taskId?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    authorId?: StringFilter;

    @Field(() => TaskScalarRelationFilter, {nullable:true})
    task?: TaskScalarRelationFilter;

    @Field(() => UserScalarRelationFilter, {nullable:true})
    author?: UserScalarRelationFilter;
}
