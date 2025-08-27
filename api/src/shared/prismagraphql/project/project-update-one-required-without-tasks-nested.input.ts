import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProjectCreateWithoutTasksInput } from './project-create-without-tasks.input';
import { Type } from 'class-transformer';
import { ProjectCreateOrConnectWithoutTasksInput } from './project-create-or-connect-without-tasks.input';
import { ProjectUpsertWithoutTasksInput } from './project-upsert-without-tasks.input';
import { Prisma } from '@prisma/client';
import { ProjectWhereUniqueInput } from './project-where-unique.input';
import { ProjectUpdateToOneWithWhereWithoutTasksInput } from './project-update-to-one-with-where-without-tasks.input';

@InputType()
export class ProjectUpdateOneRequiredWithoutTasksNestedInput {

    @Field(() => ProjectCreateWithoutTasksInput, {nullable:true})
    @Type(() => ProjectCreateWithoutTasksInput)
    create?: ProjectCreateWithoutTasksInput;

    @Field(() => ProjectCreateOrConnectWithoutTasksInput, {nullable:true})
    @Type(() => ProjectCreateOrConnectWithoutTasksInput)
    connectOrCreate?: ProjectCreateOrConnectWithoutTasksInput;

    @Field(() => ProjectUpsertWithoutTasksInput, {nullable:true})
    @Type(() => ProjectUpsertWithoutTasksInput)
    upsert?: ProjectUpsertWithoutTasksInput;

    @Field(() => ProjectWhereUniqueInput, {nullable:true})
    @Type(() => ProjectWhereUniqueInput)
    connect?: Prisma.AtLeast<ProjectWhereUniqueInput, 'id'>;

    @Field(() => ProjectUpdateToOneWithWhereWithoutTasksInput, {nullable:true})
    @Type(() => ProjectUpdateToOneWithWhereWithoutTasksInput)
    update?: ProjectUpdateToOneWithWhereWithoutTasksInput;
}
