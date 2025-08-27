import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Task } from '../task/task.model';
import { ProjectMember } from '../project-member/project-member.model';
import { ProjectCount } from './project-count.output';

@ObjectType()
export class Project {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description!: string | null;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => [Task], {nullable:true})
    tasks?: Array<Task>;

    @Field(() => [ProjectMember], {nullable:true})
    members?: Array<ProjectMember>;

    @Field(() => ProjectCount, {nullable:false})
    _count?: ProjectCount;
}
