import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class TaskCommentScalarWhereInput {

    @Field(() => [TaskCommentScalarWhereInput], {nullable:true})
    AND?: Array<TaskCommentScalarWhereInput>;

    @Field(() => [TaskCommentScalarWhereInput], {nullable:true})
    OR?: Array<TaskCommentScalarWhereInput>;

    @Field(() => [TaskCommentScalarWhereInput], {nullable:true})
    NOT?: Array<TaskCommentScalarWhereInput>;

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
}
