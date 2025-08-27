import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { TaskCommentCountAggregate } from './task-comment-count-aggregate.output';
import { TaskCommentMinAggregate } from './task-comment-min-aggregate.output';
import { TaskCommentMaxAggregate } from './task-comment-max-aggregate.output';

@ObjectType()
export class AggregateTaskComment {

    @Field(() => TaskCommentCountAggregate, {nullable:true})
    _count?: TaskCommentCountAggregate;

    @Field(() => TaskCommentMinAggregate, {nullable:true})
    _min?: TaskCommentMinAggregate;

    @Field(() => TaskCommentMaxAggregate, {nullable:true})
    _max?: TaskCommentMaxAggregate;
}
