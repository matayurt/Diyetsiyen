import '../styles/globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Modern Website',
  description: 'Modern tasarımlı site',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
