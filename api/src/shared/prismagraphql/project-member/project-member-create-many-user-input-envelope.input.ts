import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProjectMemberCreateManyUserInput } from './project-member-create-many-user.input';
import { Type } from 'class-transformer';

@InputType()
export class ProjectMemberCreateManyUserInputEnvelope {

    @Field(() => [ProjectMemberCreateManyUserInput], {nullable:false})
    @Type(() => ProjectMemberCreateManyUserInput)
    data!: Array<ProjectMemberCreateManyUserInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
