import { describe, it, expect, vi, beforeEach } from 'vitest'
import { addToWaitlistWithVerification } from '../lead-capture'

// Mock Resend
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ id: 'test-email-id' }),
    },
  })),
}))

describe('addToWaitlistWithVerification', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.RESEND_API_KEY = 'test_key'
    process.env.RESEND_FROM_EMAIL = 'test@example.com'
    process.env.APP_URL = 'https://example.com'
  })

  it('validates email format', async () => {
    const formData = new FormData()
    formData.append('email', 'invalid-email')
    formData.append('name', 'Test User')

    const result = await addToWaitlistWithVerification(formData)

    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  it('accepts valid email and returns success', async () => {
    const formData = new FormData()
    formData.append('email', 'test@example.com')
    formData.append('name', 'Test User')

    const result = await addToWaitlistWithVerification(formData)

    expect(result.success).toBe(true)
    expect(result.message).toContain('Check your email')
  })
})
