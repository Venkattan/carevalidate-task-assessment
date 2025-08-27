import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { EnumTaskStatusWithAggregatesFilter } from '../prisma/enum-task-status-with-aggregates-filter.input';
import { EnumTaskPriorityWithAggregatesFilter } from '../prisma/enum-task-priority-with-aggregates-filter.input';
import { DateTimeNullableWithAggregatesFilter } from '../prisma/date-time-nullable-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';

@InputType()
export class TaskScalarWhereWithAggregatesInput {

    @Field(() => [TaskScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<TaskScalarWhereWithAggregatesInput>;

    @Field(() => [TaskScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<TaskScalarWhereWithAggregatesInput>;

    @Field(() => [TaskScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<TaskScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    title?: StringWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    description?: StringNullableWithAggregatesFilter;

    @Field(() => EnumTaskStatusWithAggregatesFilter, {nullable:true})
    status?: EnumTaskStatusWithAggregatesFilter;

    @Field(() => EnumTaskPriorityWithAggregatesFilter, {nullable:true})
    priority?: EnumTaskPriorityWithAggregatesFilter;

    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    dueDate?: DateTimeNullableWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: DateTimeWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    updatedAt?: DateTimeWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    createdBy?: StringWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    assignedTo?: StringNullableWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    projectId?: StringWithAggregatesFilter;
}
