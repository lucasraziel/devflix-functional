import { generateUnprocessedVideoWorkflow } from './generate-unprocessed-video';

describe('GenerateUnprocessedVideoWorkflow', () => {
  const saveToDatabase = jest.fn();

  it('should generate unprocessedVideo', async () => {
    saveToDatabase.mockResolvedValueOnce(undefined);
    const generateUnprocessedVideoWorkflowInjected =
      generateUnprocessedVideoWorkflow(saveToDatabase);

    await expect(
      generateUnprocessedVideoWorkflowInjected({
        url: 'url',
        fileInfo: {
          name: 'name',
          path: 'path',
        },
      }),
    ).resolves.toEqual({
      type: 'ok',
      data: {
        id: expect.any(String),
        file: {
          fileInfo: {
            name: 'name',
            path: 'path',
          },
          url: 'url',
        },
      },
    });
  });

  it('should not generate unprocessedVideo when save To Database fails', () => {
    saveToDatabase.mockResolvedValueOnce({
      type: 'error',
      error: new Error('error'),
    });
    const generateUnprocessedVideoWorkflowInjected =
      generateUnprocessedVideoWorkflow(saveToDatabase);

    expect(
      generateUnprocessedVideoWorkflowInjected({
        url: 'url',
        fileInfo: {
          name: 'name',
          path: 'path',
        },
      }),
    ).resolves.toEqual({
      type: 'error',
      error: new Error('error'),
    });
  });
});
