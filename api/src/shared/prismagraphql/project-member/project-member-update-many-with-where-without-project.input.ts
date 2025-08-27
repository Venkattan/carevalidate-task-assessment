import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProjectMemberScalarWhereInput } from './project-member-scalar-where.input';
import { Type } from 'class-transformer';
import { ProjectMemberUpdateManyMutationInput } from './project-member-update-many-mutation.input';

@InputType()
export class ProjectMemberUpdateManyWithWhereWithoutProjectInput {

    @Field(() => ProjectMemberScalarWhereInput, {nullable:false})
    @Type(() => ProjectMemberScalarWhereInput)
    where!: ProjectMemberScalarWhereInput;

    @Field(() => ProjectMemberUpdateManyMutationInput, {nullable:false})
    @Type(() => ProjectMemberUpdateManyMutationInput)
    data!: ProjectMemberUpdateManyMutationInput;
}
