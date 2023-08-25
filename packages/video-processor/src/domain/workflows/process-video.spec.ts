import { processVideoWorkflow } from './process-video';
describe('ProcessVideo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockGenerateDifferentResolutions = jest.fn();
  const mockSaveProcessedVideoToDatabase = jest.fn();

  it('should process video when all dependencies runs correctly', () => {
    mockGenerateDifferentResolutions.mockResolvedValueOnce({
      type: 'ok',
      data: {
        id: 'id',
        subtitles: [],
        audios: [],
        resolutions: [],
      },
    });
    mockSaveProcessedVideoToDatabase.mockResolvedValueOnce(undefined);

    const processVideo = processVideoWorkflow(
      mockGenerateDifferentResolutions,
      mockSaveProcessedVideoToDatabase,
    );

    expect(
      processVideo({
        id: 'id',
        file: {
          fileInfo: {
            name: 'name',
            path: 'path',
          },
          url: 'url',
        },
      }),
    ).resolves.toEqual({
      type: 'ok',
      data: {
        id: 'id',
        subtitles: [],
        audios: [],
        resolutions: [],
      },
    });
  });

  it('should not upload file and should not run saveToStorage when file does not exists', () => {
    mockGenerateDifferentResolutions.mockResolvedValueOnce({
      type: 'error',
      error: new Error('Error on generate different resolutions'),
    });

    const processVideo = processVideoWorkflow(
      mockGenerateDifferentResolutions,
      mockSaveProcessedVideoToDatabase,
    );

    expect(
      processVideo({
        id: 'id',
        file: {
          fileInfo: {
            name: 'name',
            path: 'path',
          },
          url: 'url',
        },
      }),
    ).resolves.toStrictEqual({
      type: 'error',
      error: new Error('Error on generate different resolutions'),
    });

    expect(mockSaveProcessedVideoToDatabase).not.toHaveBeenCalled();
  });

  it('should finish with error when save to storage fails', () => {
    mockGenerateDifferentResolutions.mockResolvedValueOnce({
      type: 'ok',
      data: {
        id: 'id',
        subtitles: [],
        audios: [],
        resolutions: [],
      },
    });

    mockSaveProcessedVideoToDatabase.mockResolvedValueOnce({
      type: 'error',
      error: new Error('Error I/O'),
    });

    const processVideo = processVideoWorkflow(
      mockGenerateDifferentResolutions,
      mockSaveProcessedVideoToDatabase,
    );

    expect(
      processVideo({
        id: 'id',
        file: {
          fileInfo: {
            name: 'name',
            path: 'path',
          },
          url: 'url',
        },
      }),
    ).resolves.toStrictEqual({
      type: 'error',
      error: new Error('Error I/O'),
    });

    expect(mockSaveProcessedVideoToDatabase).not.toHaveBeenCalled();
  });
});
