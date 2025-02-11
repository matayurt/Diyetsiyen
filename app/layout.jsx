// app/layout.jsx
import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import { RecipeProvider } from '@/contexts/RecipeContext'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { NotificationProvider } from '@/contexts/NotificationContext'
import { CSPostHogProvider } from './providers'
import Script from 'next/script'

export const metadata = {
  metadataBase: new URL('https://www.melikeozturk.com'),
  title: {
    template: '%s | Diyetisyen Melike Öztürk',
    default: 'Diyetisyen Melike Öztürk | Kocaeli İzmit Diyet Danışmanlığı',
  },
  description: 'Kocaeli ve İzmit\'te uzman diyetisyen Melike Öztürk ile sağlıklı beslenme ve kişiye özel diyet programları. Online diyet danışmanlığı hizmetleri.',
  keywords: [
    'diyetisyen', 'Melike Öztürk', 'Kocaeli diyetisyen', 'İzmit diyetisyen',
    'online diyet', 'beslenme danışmanı', 'sağlıklı beslenme', 'kilo verme',
    'kilo alma', 'sporcu beslenmesi', 'hamilelik beslenmesi', 'çocuk beslenmesi'
  ].join(', '),
  authors: [{ name: 'Diyetisyen Melike Öztürk' }],
  creator: 'Diyetisyen Melike Öztürk',
  publisher: 'Diyetisyen Melike Öztürk',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'tr-TR': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: '/',
    siteName: 'Diyetisyen Melike Öztürk',
    title: 'Diyetisyen Melike Öztürk | Kocaeli İzmit Diyet Danışmanlığı',
    description: 'Kocaeli ve İzmit\'te uzman diyetisyen hizmetleri. Bilimsel ve güncel yaklaşımlarla kişiye özel beslenme programları.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Diyetisyen Melike Öztürk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diyetisyen Melike Öztürk | Kocaeli İzmit Diyet',
    description: 'Kocaeli ve İzmit\'te profesyonel diyet danışmanlığı hizmetleri.',
    images: ['/images/og-image.jpg'],
    creator: '@dyt_melikeozturk',
  },
  verification: {
    google: 'xEsC2s7B44Act0oO7Ar6EE5IWA0rvduKTPjnUYwESmc',
    other: {
      'facebook-domain-verification': '[Facebook doğrulama kodunuz]'
    }
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-JM4CFF58FK"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JM4CFF58FK');
          `}
        </Script>
      </head>
      <body className="bg-gray-100 text-gray-900">
        <CSPostHogProvider>
          <NotificationProvider>
            <RecipeProvider>
              <Navbar />
              {children}
              <SpeedInsights />
            </RecipeProvider>
          </NotificationProvider>
        </CSPostHogProvider>
      </body>
    </html>
  )
}