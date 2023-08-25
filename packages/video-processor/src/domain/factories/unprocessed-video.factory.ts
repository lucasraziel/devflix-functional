import { FileSaved, Return, map } from '@fvsystem/commom';
import { UnprocessedVideo } from '../types/basic';
import { v4 as uuid } from 'uuid';

export function unprocessedVideoFactory(file: FileSaved): UnprocessedVideo {
  return {
    file: file,
    id: uuid(),
  };
}

export function unprocessedVideoFactoryMapped(
  file: FileSaved,
): Return<UnprocessedVideo, Error> {
  return map(unprocessedVideoFactory)({
    data: file,
    type: 'ok',
  });
}
