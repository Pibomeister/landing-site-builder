import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { WaitlistForm } from '../waitlist-form';

describe('WaitlistForm', () => {
  it('renders email input and submit button', () => {
    render(<WaitlistForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /join waitlist/i })).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    render(<WaitlistForm />);

    const input = screen.getByLabelText(/email/i);
    const form = input.closest('form')!;

    // Use fireEvent.change to set value then submit the form directly
    await act(async () => {
      fireEvent.change(input, { target: { value: 'invalid-email' } });
      fireEvent.submit(form);
    });

    await waitFor(
      () => {
        expect(screen.getByRole('alert')).toHaveTextContent(/valid email/i);
      },
      { timeout: 3000 }
    );
  });

  it('shows loading state on submit', async () => {
    // Use a never-resolving mock to keep the loading state visible
    const neverResolve = new Promise<{ success: boolean }>(() => {});
    const mockSubmit = vi.fn().mockReturnValue(neverResolve);

    render(<WaitlistForm onSubmit={mockSubmit} />);

    const input = screen.getByLabelText(/email/i);
    const form = input.closest('form')!;

    await act(async () => {
      fireEvent.change(input, { target: { value: 'test@example.com' } });
      fireEvent.submit(form);
    });

    const button = screen.getByRole('button');
    await waitFor(
      () => {
        expect(button).toHaveAttribute('aria-busy', 'true');
        expect(screen.getByRole('status')).toBeInTheDocument(); // Spinner
      },
      { timeout: 3000 }
    );
  });

  it('shows success message on successful submission', async () => {
    const mockSubmit = vi.fn().mockResolvedValue({ success: true });
    render(<WaitlistForm onSubmit={mockSubmit} />);

    const input = screen.getByLabelText(/email/i);
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/check your email/i);
    });
  });
});
