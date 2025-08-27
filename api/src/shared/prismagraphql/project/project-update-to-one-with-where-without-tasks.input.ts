import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProjectWhereInput } from './project-where.input';
import { Type } from 'class-transformer';
import { ProjectUpdateWithoutTasksInput } from './project-update-without-tasks.input';

@InputType()
export class ProjectUpdateToOneWithWhereWithoutTasksInput {

    @Field(() => ProjectWhereInput, {nullable:true})
    @Type(() => ProjectWhereInput)
    where?: ProjectWhereInput;

    @Field(() => ProjectUpdateWithoutTasksInput, {nullable:false})
    @Type(() => ProjectUpdateWithoutTasksInput)
    data!: ProjectUpdateWithoutTasksInput;
}
