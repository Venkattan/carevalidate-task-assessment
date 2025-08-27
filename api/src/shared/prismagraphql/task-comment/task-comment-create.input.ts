import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCreateNestedOneWithoutCommentsInput } from '../task/task-create-nested-one-without-comments.input';
import { UserCreateNestedOneWithoutCommentsInput } from '../user/user-create-nested-one-without-comments.input';

@InputType()
export class TaskCommentCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    content!: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => TaskCreateNestedOneWithoutCommentsInput, {nullable:false})
    task!: TaskCreateNestedOneWithoutCommentsInput;

    @Field(() => UserCreateNestedOneWithoutCommentsInput, {nullable:false})
    author!: UserCreateNestedOneWithoutCommentsInput;
}
