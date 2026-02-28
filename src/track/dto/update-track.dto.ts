import { IsOptional, IsString, IsUUID, IsInt } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID('4')
  artistId?: string | null;

  @IsOptional()
  @IsUUID('4')
  albumId?: string | null;

  @IsOptional()
  @IsInt()
  duration?: number;
}
