import {
  ProcessedVideo,
  ResolutionType,
  UnprocessedVideo,
} from '../types/basic';
import { v4 as uuid } from 'uuid';

export function processedVideoFactory(
  unprocessedVideo: UnprocessedVideo,
): ProcessedVideo {
  return {
    id: uuid(),
    resolutions: [
      {
        file: unprocessedVideo.file,
        id: uuid(),
        resolutionType: ResolutionType.LARGE,
      },
    ],
    subtitles: [],
    audios: [],
  };
}
