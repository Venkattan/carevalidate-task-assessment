import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProjectMemberCreateManyInput } from './project-member-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyProjectMemberArgs {

    @Field(() => [ProjectMemberCreateManyInput], {nullable:false})
    @Type(() => ProjectMemberCreateManyInput)
    data!: Array<ProjectMemberCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
