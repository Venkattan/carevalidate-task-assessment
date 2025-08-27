import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProjectMemberWhereInput } from './project-member-where.input';
import { Type } from 'class-transformer';
import { ProjectMemberOrderByWithAggregationInput } from './project-member-order-by-with-aggregation.input';
import { ProjectMemberScalarFieldEnum } from './project-member-scalar-field.enum';
import { ProjectMemberScalarWhereWithAggregatesInput } from './project-member-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { ProjectMemberCountAggregateInput } from './project-member-count-aggregate.input';
import { ProjectMemberMinAggregateInput } from './project-member-min-aggregate.input';
import { ProjectMemberMaxAggregateInput } from './project-member-max-aggregate.input';

@ArgsType()
export class ProjectMemberGroupByArgs {

    @Field(() => ProjectMemberWhereInput, {nullable:true})
    @Type(() => ProjectMemberWhereInput)
    where?: ProjectMemberWhereInput;

    @Field(() => [ProjectMemberOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<ProjectMemberOrderByWithAggregationInput>;

    @Field(() => [ProjectMemberScalarFieldEnum], {nullable:false})
    by!: Array<`${ProjectMemberScalarFieldEnum}`>;

    @Field(() => ProjectMemberScalarWhereWithAggregatesInput, {nullable:true})
    having?: ProjectMemberScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => ProjectMemberCountAggregateInput, {nullable:true})
    _count?: ProjectMemberCountAggregateInput;

    @Field(() => ProjectMemberMinAggregateInput, {nullable:true})
    _min?: ProjectMemberMinAggregateInput;

    @Field(() => ProjectMemberMaxAggregateInput, {nullable:true})
    _max?: ProjectMemberMaxAggregateInput;
}
