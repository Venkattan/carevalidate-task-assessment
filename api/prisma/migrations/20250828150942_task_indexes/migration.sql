-- CreateIndex
CREATE INDEX "projects_createdAt_idx" ON "public"."projects"("createdAt");

-- CreateIndex
CREATE INDEX "projects_name_idx" ON "public"."projects"("name");

-- CreateIndex
CREATE INDEX "task_comments_taskId_idx" ON "public"."task_comments"("taskId");

-- CreateIndex
CREATE INDEX "task_comments_authorId_idx" ON "public"."task_comments"("authorId");

-- CreateIndex
CREATE INDEX "task_comments_createdAt_idx" ON "public"."task_comments"("createdAt");

-- CreateIndex
CREATE INDEX "task_comments_taskId_createdAt_idx" ON "public"."task_comments"("taskId", "createdAt");

-- CreateIndex
CREATE INDEX "tasks_projectId_idx" ON "public"."tasks"("projectId");

-- CreateIndex
CREATE INDEX "tasks_createdBy_idx" ON "public"."tasks"("createdBy");

-- CreateIndex
CREATE INDEX "tasks_assignedTo_idx" ON "public"."tasks"("assignedTo");

-- CreateIndex
CREATE INDEX "tasks_status_idx" ON "public"."tasks"("status");

-- CreateIndex
CREATE INDEX "tasks_priority_idx" ON "public"."tasks"("priority");

-- CreateIndex
CREATE INDEX "tasks_dueDate_idx" ON "public"."tasks"("dueDate");

-- CreateIndex
CREATE INDEX "tasks_createdAt_idx" ON "public"."tasks"("createdAt");

-- CreateIndex
CREATE INDEX "tasks_updatedAt_idx" ON "public"."tasks"("updatedAt");

-- CreateIndex
CREATE INDEX "tasks_projectId_status_idx" ON "public"."tasks"("projectId", "status");

-- CreateIndex
CREATE INDEX "tasks_projectId_assignedTo_idx" ON "public"."tasks"("projectId", "assignedTo");

-- CreateIndex
CREATE INDEX "tasks_projectId_createdAt_idx" ON "public"."tasks"("projectId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "tasks_status_createdAt_idx" ON "public"."tasks"("status", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "tasks_assignedTo_status_idx" ON "public"."tasks"("assignedTo", "status");

-- CreateIndex
CREATE INDEX "tasks_priority_dueDate_idx" ON "public"."tasks"("priority", "dueDate");

-- CreateIndex
CREATE INDEX "users_createdAt_idx" ON "public"."users"("createdAt");
