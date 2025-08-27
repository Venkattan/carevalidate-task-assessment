import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskUncheckedCreateNestedManyWithoutProjectInput } from '../task/task-unchecked-create-nested-many-without-project.input';
import { ProjectMemberUncheckedCreateNestedManyWithoutProjectInput } from '../project-member/project-member-unchecked-create-nested-many-without-project.input';

@InputType()
export class ProjectUncheckedCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => TaskUncheckedCreateNestedManyWithoutProjectInput, {nullable:true})
    tasks?: TaskUncheckedCreateNestedManyWithoutProjectInput;

    @Field(() => ProjectMemberUncheckedCreateNestedManyWithoutProjectInput, {nullable:true})
    members?: ProjectMemberUncheckedCreateNestedManyWithoutProjectInput;
}
