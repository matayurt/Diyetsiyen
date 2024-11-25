import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import { RecipeProvider } from '@/contexts/RecipeContext'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { NotificationProvider } from '@/contexts/NotificationContext'

// Force dynamic rendering and disable cache
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

export const metadata = {
  title: 'Diyetisyen Melike Öztürk | Kocaeli İzmit Online Diyet Danışmanlığı',
  description: 'Kocaeli ve İzmit\'te uzman diyetisyen Melike Öztürk ile online diyet, kişiye özel beslenme programı, kilo verme, kilo alma ve sağlıklı yaşam danışmanlığı. Alanında uzman diyetisyeniniz ile sağlıklı beslenmeye ilk adımı atın.',
  keywords: 'diyetisyen, Melike Öztürk, Kocaeli diyetisyen, İzmit diyetisyen, online diyet, uzman diyetisyen, beslenme danışmanı, sağlıklı beslenme, kilo verme, kilo alma, metabolizma hızlandırma, sporcu beslenmesi, hamilelik diyeti',
  openGraph: {
    title: 'Diyetisyen Melike Öztürk | Kocaeli İzmit Online Diyet',
    description: 'Kocaeli ve İzmit\'te uzman diyetisyen Melike Öztürk ile kişiye özel online diyet ve beslenme danışmanlığı hizmetleri.',
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
      'max-image-preview': 'large'
    }
  },
  verification: {
    google: 'google-site-verification-code',
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