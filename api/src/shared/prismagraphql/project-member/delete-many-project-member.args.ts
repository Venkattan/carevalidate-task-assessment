import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProjectMemberWhereInput } from './project-member-where.input';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteManyProjectMemberArgs {

    @Field(() => ProjectMemberWhereInput, {nullable:true})
    @Type(() => ProjectMemberWhereInput)
    where?: ProjectMemberWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
