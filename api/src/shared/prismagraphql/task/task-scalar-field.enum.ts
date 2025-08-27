import { registerEnumType } from '@nestjs/graphql';

export enum TaskScalarFieldEnum {
    id = "id",
    title = "title",
    description = "description",
    status = "status",
    priority = "priority",
    dueDate = "dueDate",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    createdBy = "createdBy",
    assignedTo = "assignedTo",
    projectId = "projectId"
}


registerEnumType(TaskScalarFieldEnum, { name: 'TaskScalarFieldEnum', description: undefined })
