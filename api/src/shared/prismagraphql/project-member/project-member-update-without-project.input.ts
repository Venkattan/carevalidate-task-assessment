import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UserUpdateOneRequiredWithoutProjectsNestedInput } from '../user/user-update-one-required-without-projects-nested.input';

@InputType()
export class ProjectMemberUpdateWithoutProjectInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => UserUpdateOneRequiredWithoutProjectsNestedInput, {nullable:true})
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput;
}
