import { AsyncReturn, FileInfo, FileSaved } from '@fvsystem/commom';
import { ProcessedVideo, UnprocessedVideo } from './basic';

export type UploadVideo = (file: FileInfo) => AsyncReturn<FileSaved>;

export type GenerateUnprocessedVideo = (
  file: FileSaved,
) => AsyncReturn<UnprocessedVideo>;

export type ProcessVideo = (
  unprocessedVideo: UnprocessedVideo,
) => AsyncReturn<ProcessedVideo>;
