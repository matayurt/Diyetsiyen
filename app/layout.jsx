import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import { RecipeProvider } from '@/contexts/RecipeContext'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { NotificationProvider } from '@/contexts/NotificationContext'
import Script from 'next/script'

export const dynamic = 'force-dynamic'
export const revalidate = 0 
export const fetchCache = 'force-no-store'

export const metadata = {
  title: 'Kocaeli Diyetisyen | İzmit Diyetisyen Melike Öztürk',
  description: 'Kocaeli ve İzmit\'te uzman diyetisyen Melike Öztürk ile online diyet, beslenme danışmanlığı ve kişiye özel beslenme programları. 10 yıllık tecrübe ile bilimsel ve sağlıklı beslenme.',
  keywords: 'kocaeli diyetisyen, izmit diyetisyen, Melike Öztürk, online diyet, beslenme danışmanı, diyetisyen izmit, diyetisyen kocaeli, sağlıklı beslenme, kilo verme, sporcu beslenmesi, hamilelik beslenmesi',
  openGraph: {
    title: 'Kocaeli Diyetisyen | İzmit Diyetisyen Melike Öztürk',
    description: 'Kocaeli ve İzmit\'in deneyimli diyetisyeni Melike Öztürk ile sağlıklı beslenme ve kişiye özel diyet programları.',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Diyetisyen Melike Öztürk'
  },
  alternates: {
    canonical: 'https://www.melikeozturk.com'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  verification: {
    google: 'xEsC2s7B44Act0oO7Ar6EE5IWA0rvduKTPjnUYwESmc',
  }
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
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <meta name="google-site-verification" content="xEsC2s7B44Act0oO7Ar6EE5IWA0rvduKTPjnUYwESmc" />
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
