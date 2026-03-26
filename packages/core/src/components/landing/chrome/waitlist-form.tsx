'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  waitlistFormSchema,
  type WaitlistFormData,
} from '../../../registry/schemas/waitlist-form.schema';

interface WaitlistFormProps {
  onSubmit?: (data: WaitlistFormData) => Promise<{ success: boolean; message?: string }>;
  className?: string;
}

export function WaitlistForm({ onSubmit, className = '' }: WaitlistFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistFormSchema),
  });

  const onSubmitForm = async (data: WaitlistFormData) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = onSubmit
        ? await onSubmit(data)
        : { success: true, message: 'Check your email to verify!' };

      if (result.success) {
        setSuccessMessage(result.message || 'Check your email to verify!');
        reset();
      } else {
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className={`space-y-4 ${className}`}
      aria-live="polite"
    >
      <div className="space-y-2">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={isLoading}
          className="h-12 md:h-10 w-full rounded-lg border border-input bg-transparent px-4 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
        />
        {errors.email && (
          <div id="email-error" role="alert" className="text-sm text-destructive">
            {errors.email.message}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
        className="w-full h-12 md:h-10 inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-8 py-4 text-base font-semibold hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        {isLoading ? (
          <>
            <span
              role="status"
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2"
            />
            Joining...
          </>
        ) : (
          'Join Waitlist'
        )}
      </button>

      {successMessage && (
        <div
          role="status"
          className="p-4 rounded-lg bg-success/10 text-success border border-success/20"
        >
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20"
        >
          {errorMessage}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        We&apos;ll send you a verification email. By joining, you agree to our{' '}
        <a href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
