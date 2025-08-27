import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProjectWhereInput } from './project-where.input';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteManyProjectArgs {

    @Field(() => ProjectWhereInput, {nullable:true})
    @Type(() => ProjectWhereInput)
    where?: ProjectWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
