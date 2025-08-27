import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProjectMemberWhereInput } from './project-member-where.input';
import { Type } from 'class-transformer';
import { ProjectMemberOrderByWithRelationInput } from './project-member-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { ProjectMemberWhereUniqueInput } from './project-member-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ProjectMemberCountAggregateInput } from './project-member-count-aggregate.input';
import { ProjectMemberMinAggregateInput } from './project-member-min-aggregate.input';
import { ProjectMemberMaxAggregateInput } from './project-member-max-aggregate.input';

@ArgsType()
export class ProjectMemberAggregateArgs {

    @Field(() => ProjectMemberWhereInput, {nullable:true})
    @Type(() => ProjectMemberWhereInput)
    where?: ProjectMemberWhereInput;

    @Field(() => [ProjectMemberOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ProjectMemberOrderByWithRelationInput>;

    @Field(() => ProjectMemberWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ProjectMemberWhereUniqueInput, 'id' | 'userId_projectId'>;

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
