import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TaskCommentWhereInput } from './task-comment-where.input';
import { Type } from 'class-transformer';
import { TaskCommentOrderByWithRelationInput } from './task-comment-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { TaskCommentWhereUniqueInput } from './task-comment-where-unique.input';
import { Int } from '@nestjs/graphql';
import { TaskCommentScalarFieldEnum } from './task-comment-scalar-field.enum';

@ArgsType()
export class FindFirstTaskCommentArgs {

    @Field(() => TaskCommentWhereInput, {nullable:true})
    @Type(() => TaskCommentWhereInput)
    where?: TaskCommentWhereInput;

    @Field(() => [TaskCommentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<TaskCommentOrderByWithRelationInput>;

    @Field(() => TaskCommentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<TaskCommentWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [TaskCommentScalarFieldEnum], {nullable:true})
    distinct?: Array<`${TaskCommentScalarFieldEnum}`>;
}
