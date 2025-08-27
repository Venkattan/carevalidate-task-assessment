import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProjectUpdateManyMutationInput } from './project-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ProjectWhereInput } from './project-where.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateManyProjectArgs {

    @Field(() => ProjectUpdateManyMutationInput, {nullable:false})
    @Type(() => ProjectUpdateManyMutationInput)
    data!: ProjectUpdateManyMutationInput;

    @Field(() => ProjectWhereInput, {nullable:true})
    @Type(() => ProjectWhereInput)
    where?: ProjectWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
