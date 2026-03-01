import { Artist, Album, Track } from "src/shared/interfaces";

export class FavoritesResponseDto {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}