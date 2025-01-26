import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LearnMate AI',
  description: 'AI-Powered Adaptive Learning Assistant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <motion.header 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <motion.h1 
              className="text-3xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              LearnMate AI
            </motion.h1>
            <div className="space-x-2">
              <Button variant="secondary" className="hover:bg-white hover:text-blue-600 transition-colors">Log In</Button>
              <Button variant="default" className="bg-purple-500 hover:bg-purple-600 transition-colors">Sign Up</Button>
            </div>
          </div>
        </motion.header>
        {children}
      </body>
    </html>
  )
}