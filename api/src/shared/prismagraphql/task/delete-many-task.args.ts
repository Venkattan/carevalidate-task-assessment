import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TaskWhereInput } from './task-where.input';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteManyTaskArgs {

    @Field(() => TaskWhereInput, {nullable:true})
    @Type(() => TaskWhereInput)
    where?: TaskWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
