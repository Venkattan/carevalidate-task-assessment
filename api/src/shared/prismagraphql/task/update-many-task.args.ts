import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TaskUpdateManyMutationInput } from './task-update-many-mutation.input';
import { Type } from 'class-transformer';
import { TaskWhereInput } from './task-where.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateManyTaskArgs {

    @Field(() => TaskUpdateManyMutationInput, {nullable:false})
    @Type(() => TaskUpdateManyMutationInput)
    data!: TaskUpdateManyMutationInput;

    @Field(() => TaskWhereInput, {nullable:true})
    @Type(() => TaskWhereInput)
    where?: TaskWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
