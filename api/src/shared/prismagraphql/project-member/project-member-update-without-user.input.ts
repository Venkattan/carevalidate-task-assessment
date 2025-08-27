import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { ProjectUpdateOneRequiredWithoutMembersNestedInput } from '../project/project-update-one-required-without-members-nested.input';

@InputType()
export class ProjectMemberUpdateWithoutUserInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => ProjectUpdateOneRequiredWithoutMembersNestedInput, {nullable:true})
    project?: ProjectUpdateOneRequiredWithoutMembersNestedInput;
}
