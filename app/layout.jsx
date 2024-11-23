import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import { RecipeProvider } from '@/contexts/RecipeContext';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: 'Modern Website',
  description: 'Modern tasarımlı site',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <RecipeProvider>
        <Navbar />
          {children}
          <SpeedInsights />
        </RecipeProvider>
      </body>
    </html>
  )
}
