import { FileSaved } from '@fvsystem/commom';

export type UnprocessedVideo = {
  fileInfo: FileSaved;
  id: UnprocessedVideoId;
};

export type UnprocessedVideoId = string;

export type ProcessedVideo = {
  id: ProcessedVideoId;
  subtitles: Subtitle[];
  audios: Audio[];
  resolutions: Resolution[];
};

export type ProcessedVideoId = string;

export type Subtitle = {
  id: SubtitleId;
  language: Language;
  fileInfo: FileSaved;
};

export type Language = string;

export type SubtitleId = string;

export type Audio = {
  id: AudioId;
  language: Language;
  fileInfo: FileSaved;
};

export type AudioId = string;

export type Resolution = {
  id: ResolutionId;
  fileInfo: FileSaved;
  resolutionType: ResolutionType;
};

export type ResolutionId = string;

enum ResolutionType {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}
