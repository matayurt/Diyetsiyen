import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import { RecipeProvider } from '@/contexts/RecipeContext';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { NotificationProvider } from '@/contexts/NotificationContext';

export const metadata = {
  title: 'Diyetisyen Melike Öztürk',
  description: 'Diyetisyen Melike Öztürk, sağlıklı yaşam ve beslenme konularında danışmanlık hizmeti vermektedir.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
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
