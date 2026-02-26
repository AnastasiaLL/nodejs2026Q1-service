import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  oldPassword: string; // previous password

  @IsString()
  @MinLength(3)
  newPassword: string; // new password
}
