import { registerEnumType } from '@nestjs/graphql';

export enum ProjectScalarFieldEnum {
    id = "id",
    name = "name",
    description = "description",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(ProjectScalarFieldEnum, { name: 'ProjectScalarFieldEnum', description: undefined })
