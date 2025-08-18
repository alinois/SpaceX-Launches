import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { Body } from '../Modules/Body/Body';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

global.fetch = vi.fn((): Promise<Response> => {
  const mockResponse = {
    ok: true,
    json: () =>
      Promise.resolve([
        {
          mission_name: 'Test Mission',
          details: 'Test details',
          rocket: { rocket_name: 'Falcon 9' },
          links: {
            mission_patch: 'https://example.com/patch.png',
            mission_patch_small: 'https://example.com/patch_small.png',
          },
        },
      ]),
  };

  return Promise.resolve(mockResponse as unknown as Response);
});

describe('Body component', () => {
  it('renders and fetches launches', async () => {
    render(
      <MantineProvider>
        <Body />
      </MantineProvider>
    );

    expect(screen.getByText('SpaceX Launches 2020')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Test Mission')).toBeInTheDocument();
    });
  });
});
