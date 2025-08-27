import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ProjectWhereUniqueInput } from './project-where-unique.input';
import { Type } from 'class-transformer';
import { ProjectCreateWithoutTasksInput } from './project-create-without-tasks.input';

@InputType()
export class ProjectCreateOrConnectWithoutTasksInput {

    @Field(() => ProjectWhereUniqueInput, {nullable:false})
    @Type(() => ProjectWhereUniqueInput)
    where!: Prisma.AtLeast<ProjectWhereUniqueInput, 'id'>;

    @Field(() => ProjectCreateWithoutTasksInput, {nullable:false})
    @Type(() => ProjectCreateWithoutTasksInput)
    create!: ProjectCreateWithoutTasksInput;
}
