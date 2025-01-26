"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DoubtSolver() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I help you with your studies today?" },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }])
      // Here you would typically send the message to your AI API and get a response
      // For this example, we'll just echo the user's message
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `You asked: "${input}". This is where the AI would provide a helpful response.`,
          },
        ])
      }, 1000)
      setInput("")
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-2xl mx-auto bg-white bg-opacity-50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-600">AI Doubt Solver</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full pr-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
                >
                  <motion.div
                    className={`inline-block p-3 rounded-lg ${
                      message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {message.content}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <div className="flex w-full space-x-2">
            <Input
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-grow"
            />
            <Button onClick={handleSend} className="bg-blue-500 hover:bg-blue-600 transition-colors">
              Send
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

