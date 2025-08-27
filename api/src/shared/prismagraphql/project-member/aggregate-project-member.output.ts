import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ProjectMemberCountAggregate } from './project-member-count-aggregate.output';
import { ProjectMemberMinAggregate } from './project-member-min-aggregate.output';
import { ProjectMemberMaxAggregate } from './project-member-max-aggregate.output';

@ObjectType()
export class AggregateProjectMember {

    @Field(() => ProjectMemberCountAggregate, {nullable:true})
    _count?: ProjectMemberCountAggregate;

    @Field(() => ProjectMemberMinAggregate, {nullable:true})
    _min?: ProjectMemberMinAggregate;

    @Field(() => ProjectMemberMaxAggregate, {nullable:true})
    _max?: ProjectMemberMaxAggregate;
}
