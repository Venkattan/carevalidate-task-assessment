import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class ProjectMemberScalarWhereInput {

    @Field(() => [ProjectMemberScalarWhereInput], {nullable:true})
    AND?: Array<ProjectMemberScalarWhereInput>;

    @Field(() => [ProjectMemberScalarWhereInput], {nullable:true})
    OR?: Array<ProjectMemberScalarWhereInput>;

    @Field(() => [ProjectMemberScalarWhereInput], {nullable:true})
    NOT?: Array<ProjectMemberScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    userId?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    projectId?: StringFilter;
}
