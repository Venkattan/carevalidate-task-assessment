import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../../auth/dto/auth.type';

@InputType()
export class CreateProjectInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;
}

@ObjectType()
export class Project {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [User], { nullable: true })
  members?: User[];
}
