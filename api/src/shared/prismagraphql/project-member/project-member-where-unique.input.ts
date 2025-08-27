import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProjectMemberUserIdProjectIdCompoundUniqueInput } from './project-member-user-id-project-id-compound-unique.input';
import { ProjectMemberWhereInput } from './project-member-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UserScalarRelationFilter } from '../user/user-scalar-relation-filter.input';
import { ProjectScalarRelationFilter } from '../project/project-scalar-relation-filter.input';

@InputType()
export class ProjectMemberWhereUniqueInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => ProjectMemberUserIdProjectIdCompoundUniqueInput, {nullable:true})
    userId_projectId?: ProjectMemberUserIdProjectIdCompoundUniqueInput;

    @Field(() => [ProjectMemberWhereInput], {nullable:true})
    AND?: Array<ProjectMemberWhereInput>;

    @Field(() => [ProjectMemberWhereInput], {nullable:true})
    OR?: Array<ProjectMemberWhereInput>;

    @Field(() => [ProjectMemberWhereInput], {nullable:true})
    NOT?: Array<ProjectMemberWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    userId?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    projectId?: StringFilter;

    @Field(() => UserScalarRelationFilter, {nullable:true})
    user?: UserScalarRelationFilter;

    @Field(() => ProjectScalarRelationFilter, {nullable:true})
    project?: ProjectScalarRelationFilter;
}
