import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProjectMemberCreateManyProjectInput } from './project-member-create-many-project.input';
import { Type } from 'class-transformer';

@InputType()
export class ProjectMemberCreateManyProjectInputEnvelope {

    @Field(() => [ProjectMemberCreateManyProjectInput], {nullable:false})
    @Type(() => ProjectMemberCreateManyProjectInput)
    data!: Array<ProjectMemberCreateManyProjectInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
