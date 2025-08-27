import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProjectMemberUpdateManyMutationInput } from './project-member-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ProjectMemberWhereInput } from './project-member-where.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateManyProjectMemberArgs {

    @Field(() => ProjectMemberUpdateManyMutationInput, {nullable:false})
    @Type(() => ProjectMemberUpdateManyMutationInput)
    data!: ProjectMemberUpdateManyMutationInput;

    @Field(() => ProjectMemberWhereInput, {nullable:true})
    @Type(() => ProjectMemberWhereInput)
    where?: ProjectMemberWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
