import { registerEnumType } from '@nestjs/graphql';

export enum TaskCommentScalarFieldEnum {
    id = "id",
    content = "content",
    createdAt = "createdAt",
    taskId = "taskId",
    authorId = "authorId"
}


registerEnumType(TaskCommentScalarFieldEnum, { name: 'TaskCommentScalarFieldEnum', description: undefined })
