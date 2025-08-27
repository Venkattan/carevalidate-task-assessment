import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';

@InputType()
export class TaskCommentScalarWhereWithAggregatesInput {

    @Field(() => [TaskCommentScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<TaskCommentScalarWhereWithAggregatesInput>;

    @Field(() => [TaskCommentScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<TaskCommentScalarWhereWithAggregatesInput>;

    @Field(() => [TaskCommentScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<TaskCommentScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    content?: StringWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: DateTimeWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    taskId?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    authorId?: StringWithAggregatesFilter;
}
