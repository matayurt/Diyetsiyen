'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.posthog.com',
    autocapture: true,
    capture_pageview: true,
    persistence: 'localStorage',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    },
    bootstrap: {
      distinctID: 'anonymous-user',
      isIdentified: false
    },
    cross_subdomain_cookie: false,
    secure_cookie: true,
    loaded: function(posthog) {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    },
    enable_recording_console_log: false // Konsol hatalarını azaltmak için
  })
}

export function CSPostHogProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}