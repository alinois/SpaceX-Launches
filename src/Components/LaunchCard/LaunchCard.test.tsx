import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { LaunchCard } from './LaunchCard';

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


const launchMock = {
  mission_name: 'Test Mission',
  details: 'Some details about the mission',
  links: {
    mission_patch: 'https://test.com/patch.png',
    mission_patch_small: 'https://test.com/patch_small.png',
  },
  rocket: {
    rocket_name: 'Falcon 9',
  },
};

describe('LaunchCard', () => {
  it('renders launch data correctly', () => {
    render(
      <MantineProvider>
        <LaunchCard launch={launchMock} onSeeMore={vi.fn()} />
      </MantineProvider>
    );

    expect(screen.getByText('Test Mission')).toBeDefined();
    expect(screen.getByText('Falcon 9')).toBeDefined();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', launchMock.links!.mission_patch_small);
    expect(image).toHaveAttribute('alt', launchMock.mission_name);
  });

it('renders fallback image and text if data missing', () => {
  const emptyLaunch = {
    mission_name: '',
    details: null,
    rocket: undefined,
    links: undefined,
  };

  render(
    <MantineProvider>
      <LaunchCard launch={emptyLaunch} onSeeMore={vi.fn()} />
    </MantineProvider>
  );

  expect(screen.getAllByText('No info').length).toBeGreaterThan(0);

  const image = screen.getByAltText('');
  expect(image.getAttribute('src')).toContain('opanki.png');
});

  it('calls onSeeMore when button clicked', () => {
    const onSeeMoreMock = vi.fn();
    render(
      <MantineProvider>
        <LaunchCard launch={launchMock} onSeeMore={onSeeMoreMock} />
      </MantineProvider>
    );

    const button = screen.getByRole('button', { name: /see more/i });
    fireEvent.click(button);

    expect(onSeeMoreMock).toHaveBeenCalledTimes(1);
  });
});
