'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BlogNewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'success' | 'error' | 'loading' | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg p-6 my-4 w-full">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
        Subscribe to the newsletter
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Get emails from me about web development, tech, and early access to new articles.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {status === 'success' && (
        <p className="mt-2 text-green-600 dark:text-green-400">
          Thanks for subscribing! Please check your email to confirm your subscription.
        </p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-red-600 dark:text-red-400">
          There was an error subscribing. Please try again.
        </p>
      )}
    </div>
  )
} 