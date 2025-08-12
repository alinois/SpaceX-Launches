import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { Body } from './Body';
import { fetchLaunches2020 } from '../../../API/launchesList';
import type { Launch } from '../../../types';
import { MantineProvider } from '@mantine/core';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

vi.mock('../../../API/launchesList', () => ({
  fetchLaunches2020: vi.fn(),
}));

const mockedFetch = fetchLaunches2020 as Mock<() => Promise<Launch[]>>;

const mockLaunches: Launch[] = [
  {
    mission_name: 'Test Mission 1',
    details: 'Details about mission 1',
    rocket: { rocket_name: 'Falcon 9' },
    links: {
      mission_patch: 'https://example.com/patch1.png',
      mission_patch_small: 'https://example.com/patch1_small.png',
    },
  },
  {
    mission_name: 'Test Mission 2',
    details: null,
    rocket: { rocket_name: 'Falcon Heavy' },
    links: {
      mission_patch: 'https://example.com/patch2.png',
      mission_patch_small: 'https://example.com/patch2_small.png',
    },
  },
];

function renderWithMantine(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

describe('Body component', () => {
  beforeEach(() => {
    mockedFetch.mockReset();
  });

  it('renders launches after fetch', async () => {
    mockedFetch.mockResolvedValue(mockLaunches);

    renderWithMantine(<Body />);

    expect(screen.getByText(/SpaceX Launches 2020/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Test Mission 1')).toBeInTheDocument();
      expect(screen.getByText('Test Mission 2')).toBeInTheDocument();
    });
  });

});
