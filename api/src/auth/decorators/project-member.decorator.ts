import { SetMetadata } from '@nestjs/common';

export const REQUIRE_PROJECT_MEMBER_KEY = 'requireProjectMember';
export const RequireProjectMember = () => SetMetadata(REQUIRE_PROJECT_MEMBER_KEY, true);
