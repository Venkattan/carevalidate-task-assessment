import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class ProjectMemberScalarWhereWithAggregatesInput {

    @Field(() => [ProjectMemberScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<ProjectMemberScalarWhereWithAggregatesInput>;

    @Field(() => [ProjectMemberScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<ProjectMemberScalarWhereWithAggregatesInput>;

    @Field(() => [ProjectMemberScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<ProjectMemberScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    userId?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    projectId?: StringWithAggregatesFilter;
}
