import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { TaskCommentCountAggregate } from './task-comment-count-aggregate.output';
import { TaskCommentMinAggregate } from './task-comment-min-aggregate.output';
import { TaskCommentMaxAggregate } from './task-comment-max-aggregate.output';

@ObjectType()
export class TaskCommentGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    content!: string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;

    @Field(() => String, {nullable:false})
    taskId!: string;

    @Field(() => String, {nullable:false})
    authorId!: string;

    @Field(() => TaskCommentCountAggregate, {nullable:true})
    _count?: TaskCommentCountAggregate;

    @Field(() => TaskCommentMinAggregate, {nullable:true})
    _min?: TaskCommentMinAggregate;

    @Field(() => TaskCommentMaxAggregate, {nullable:true})
    _max?: TaskCommentMaxAggregate;
}
