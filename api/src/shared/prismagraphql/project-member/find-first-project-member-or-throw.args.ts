import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProjectMemberWhereInput } from './project-member-where.input';
import { Type } from 'class-transformer';
import { ProjectMemberOrderByWithRelationInput } from './project-member-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { ProjectMemberWhereUniqueInput } from './project-member-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ProjectMemberScalarFieldEnum } from './project-member-scalar-field.enum';

@ArgsType()
export class FindFirstProjectMemberOrThrowArgs {

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

    @Field(() => [ProjectMemberScalarFieldEnum], {nullable:true})
    distinct?: Array<`${ProjectMemberScalarFieldEnum}`>;
}
