import { registerEnumType } from '@nestjs/graphql';

export enum ProjectMemberScalarFieldEnum {
    id = "id",
    userId = "userId",
    projectId = "projectId"
}


registerEnumType(ProjectMemberScalarFieldEnum, { name: 'ProjectMemberScalarFieldEnum', description: undefined })
