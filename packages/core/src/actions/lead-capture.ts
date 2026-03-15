'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { randomBytes } from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY)

// In-memory token store (use Redis/DB in production)
const verificationTokens = new Map<string, {
  email: string
  name?: string
  expiresAt: number
}>()

const waitlistSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2).optional(),
})

export async function addToWaitlistWithVerification(formData: FormData) {
  const parsed = waitlistSchema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
  })

  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors }
  }

  const { email, name } = parsed.data

  try {
    const token = randomBytes(32).toString('hex')
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

    verificationTokens.set(token, { email, name, expiresAt })

    const verifyUrl = `${process.env.APP_URL}/verify?token=${token}`

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: 'Verify your email',
      text: `Click to verify: ${verifyUrl}`,
    })

    return { success: true, message: 'Check your email to verify!' }
  } catch (error) {
    console.error('Verification email error:', error)
    return { success: false, error: 'Failed to send verification email' }
  }
}

export async function verifyEmailAndDeliver(token: string) {
  const data = verificationTokens.get(token)

  if (!data || Date.now() > data.expiresAt) {
    return { success: false, error: 'Invalid or expired link' }
  }

  verificationTokens.delete(token)
  return { success: true, email: data.email }
}
