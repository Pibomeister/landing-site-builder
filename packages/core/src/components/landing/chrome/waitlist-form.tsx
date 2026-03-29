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
        <label htmlFor="email" className="block text-sm font-medium leading-none select-none">
          Email address
        </label>
        {/* Input styled to match the base Input component */}
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={isLoading}
          className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
        />
        {errors.email && (
          <div id="email-error" role="alert" className="text-sm font-normal text-destructive">
            {errors.email.message}
          </div>
        )}
      </div>

      {/* Button styled to match the base Button component lg size */}
      <button
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
        className="group/button inline-flex h-12 w-full shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent bg-primary bg-clip-padding px-8 text-base font-medium text-primary-foreground whitespace-nowrap transition-[color,background-color,border-color,transform] outline-none select-none cursor-pointer hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <>
            {/* Spinner styled to match the base Spinner component */}
            <svg
              role="status"
              aria-label="Submitting"
              className="size-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Joining...
          </>
        ) : (
          'Join Waitlist'
        )}
      </button>

      {successMessage && (
        <div
          role="status"
          className="group/alert relative grid w-full gap-0.5 rounded-lg border border-transparent bg-success/10 px-2.5 py-2 text-left text-sm text-success"
        >
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="group/alert relative grid w-full gap-0.5 rounded-lg border border-transparent bg-destructive/10 px-2.5 py-2 text-left text-sm text-destructive"
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
