import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { ModalWindow } from './Modal';
import type { Launch } from '../../../../types';
import { describe, it, expect, beforeEach, afterEach, beforeAll, vi } from 'vitest';
import '@testing-library/jest-dom';
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

beforeEach(() => {
  const modalRoot = document.createElement('div');
  modalRoot.id = 'modal';
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  cleanup();
  document.body.innerHTML = '';
});

const mockLaunch: Launch = {
  mission_name: 'Test Mission',
  rocket: { rocket_name: 'Falcon 9' },
  details: 'Details here',
  links: {
    mission_patch: '',
    mission_patch_small: '',
  },
};

describe('ModalWindow', () => {
  it('does not render modal content when opened is false', () => {
    render(
      <MantineProvider>
        <ModalWindow launch={mockLaunch} opened={false} onClose={() => {}} />
      </MantineProvider>
    );

    expect(screen.queryByText('Test Mission')).not.toBeInTheDocument();
  });

  it('renders content when opened is true', () => {
    render(
      <MantineProvider>
        <ModalWindow launch={mockLaunch} opened={true} onClose={() => {}} />
      </MantineProvider>
    );

    expect(screen.getByRole('heading', { name: 'Test Mission' })).toBeInTheDocument();
    expect(screen.getByText('Falcon 9')).toBeInTheDocument();
    expect(screen.getByText('Details here')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onCloseMock = vi.fn();

    render(
      <MantineProvider>
        <ModalWindow launch={mockLaunch} opened={true} onClose={onCloseMock} />
      </MantineProvider>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
