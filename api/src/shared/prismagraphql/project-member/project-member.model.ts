import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Project } from '../project/project.model';

@ObjectType()
export class ProjectMember {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => String, {nullable:false})
    projectId!: string;

    @Field(() => User, {nullable:false})
    user?: User;

    @Field(() => Project, {nullable:false})
    project?: Project;
}
