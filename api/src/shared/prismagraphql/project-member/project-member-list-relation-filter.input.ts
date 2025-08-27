import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProjectMemberWhereInput } from './project-member-where.input';

@InputType()
export class ProjectMemberListRelationFilter {

    @Field(() => ProjectMemberWhereInput, {nullable:true})
    every?: ProjectMemberWhereInput;

    @Field(() => ProjectMemberWhereInput, {nullable:true})
    some?: ProjectMemberWhereInput;

    @Field(() => ProjectMemberWhereInput, {nullable:true})
    none?: ProjectMemberWhereInput;
}
