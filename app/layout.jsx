import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import { RecipeProvider } from '@/contexts/RecipeContext'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { NotificationProvider } from '@/contexts/NotificationContext'
import Script from 'next/script'

export const metadata = {
  title: {
    template: '%s | Diyetisyen Melike Öztürk',
    default: 'Diyetisyen Melike Öztürk | Kocaeli İzmit Diyet Danışmanlığı',
  },
  description: 'Kocaeli ve İzmit\'te diyetisyen Melike Öztürk ile online görüşme, beslenme danışmanlığı, sağlıklı beslenme programları. Bilimsel yöntemlerle beslenme alışkanlıklarınızı düzenleyin.',
  keywords: 'diyetisyen, Melike Öztürk, Kocaeli diyetisyen, İzmit diyetisyen, online diyet, beslenme danışmanı, sağlıklı beslenme, beslenme programı, metabolizma, sporcu beslenmesi, hamilelik beslenmesi',
  authors: [{ name: 'Diyetisyen Melike Öztürk' }],
  alternates: {
    canonical: 'https://www.melikeozturk.com',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://www.melikeozturk.com',
    title: 'Diyetisyen Melike Öztürk | Kocaeli İzmit Diyet',
    description: 'Kocaeli ve İzmit\'te diyetisyen Melike Öztürk ile online beslenme danışmanlığı hizmetleri.',
    siteName: 'Diyetisyen Melike Öztürk',
    images: [
      {
        url: 'https://www.melikeozturk.com/images/og-image.jpg',
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
    images: ['https://www.melikeozturk.com/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'google-site-verification': 'xEsC2s7B44Act0oO7Ar6EE5IWA0rvduKTPjnUYwESmc'
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
        <NotificationProvider>
          <RecipeProvider>
            <Navbar />
            {children}
            <SpeedInsights />
          </RecipeProvider>
        </NotificationProvider>
      </body>
    </html>
  )
}