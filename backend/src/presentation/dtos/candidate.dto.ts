import {
  IsString,
  IsEmail,
  IsOptional,
  IsUUID,
  IsNotEmpty,
  IsPhoneNumber,
  IsUrl,
} from 'class-validator';

export class CreateCandidateDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber('TR')
  phone?: string;

  @IsOptional()
  @IsUrl()
  resumeUrl?: string;

  @IsUUID()
  projectId: string;
}
