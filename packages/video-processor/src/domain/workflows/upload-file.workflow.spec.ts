import { uploadVideoWorkflow } from './upload-file.workflow';
describe('UploadWorkflow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockCheckFileExists = jest.fn();
  const mockSaveToStorage = jest.fn();

  it('should upload file when file exists and save to storage does not throw error', () => {
    mockCheckFileExists.mockResolvedValueOnce(true);
    mockSaveToStorage.mockResolvedValueOnce({
      type: 'ok',
      data: {
        url: 'url',
        fileInfo: {
          name: 'name',
          path: 'path',
        },
      },
    });

    const uploadWorkflow = uploadVideoWorkflow(
      mockCheckFileExists,
      mockSaveToStorage,
    );

    expect(uploadWorkflow({ name: 'name', path: 'path' })).resolves.toEqual({
      type: 'ok',
      data: {
        url: 'url',
        fileInfo: {
          name: 'name',
          path: 'path',
        },
      },
    });
  });

  it('should not upload file and should not run saveToStorage when file does not exists', () => {
    mockCheckFileExists.mockResolvedValueOnce(false);

    const uploadWorkflow = uploadVideoWorkflow(
      mockCheckFileExists,
      mockSaveToStorage,
    );

    expect(
      uploadWorkflow({ name: 'name', path: 'path' }),
    ).resolves.toStrictEqual({
      type: 'error',
      error: new Error('File Does not Exist'),
    });

    expect(mockSaveToStorage).not.toHaveBeenCalled();
  });

  it('should finish with error when save to storage fails', () => {
    mockCheckFileExists.mockResolvedValueOnce(true);

    mockSaveToStorage.mockResolvedValueOnce({
      type: 'error',
      error: new Error('Error I/O'),
    });

    const uploadWorkflow = uploadVideoWorkflow(
      mockCheckFileExists,
      mockSaveToStorage,
    );

    expect(
      uploadWorkflow({ name: 'name', path: 'path' }),
    ).resolves.toStrictEqual({
      type: 'error',
      error: new Error('Error I/O'),
    });

    expect(mockSaveToStorage).not.toHaveBeenCalled();
  });
});
