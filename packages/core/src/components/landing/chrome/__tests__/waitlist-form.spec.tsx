import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    const button = screen.getByRole('button', { name: /join waitlist/i });

    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/valid email/i);
    });
  });

  it('shows loading state on submit', async () => {
    render(<WaitlistForm />);

    const input = screen.getByLabelText(/email/i);
    const button = screen.getByRole('button', { name: /join waitlist/i });

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status')).toBeInTheDocument(); // Spinner
  });

  it('shows success message on successful submission', async () => {
    const mockSubmit = vi.fn().mockResolvedValue({ success: true });
    render(<WaitlistForm onSubmit={mockSubmit} />);

    const input = screen.getByLabelText(/email/i);
    const button = screen.getByRole('button', { name: /join waitlist/i });

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/check your email/i);
    });
  });
});
