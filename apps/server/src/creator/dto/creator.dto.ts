import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCreatorDto {
  @IsString()
  @IsNotEmpty()
  sql: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  email?: string;
}
