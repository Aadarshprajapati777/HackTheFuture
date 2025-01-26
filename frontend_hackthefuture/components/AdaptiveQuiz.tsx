"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const quizQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
]

export default function AdaptiveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswer = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer("")
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer("")
    setScore(0)
    setQuizCompleted(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-2xl mx-auto bg-white bg-opacity-50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-600">Adaptive Quiz</CardTitle>
          <CardDescription>Test your knowledge with our AI-powered quiz</CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {!quizCompleted ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-2">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </h3>
                <p className="mb-4">{quizQuestions[currentQuestion].question}</p>
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  {quizQuestions[currentQuestion].options.map((option) => (
                    <div key={option} className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h3 className="text-2xl font-bold mb-4">Quiz Completed!</h3>
                <p className="text-xl">
                  Your score: {score} out of {quizQuestions.length}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-end">
          {!quizCompleted ? (
            <Button
              onClick={handleAnswer}
              disabled={!selectedAnswer}
              className="bg-purple-500 hover:bg-purple-600 transition-colors"
            >
              {currentQuestion + 1 === quizQuestions.length ? "Finish" : "Next"}
            </Button>
          ) : (
            <Button onClick={resetQuiz} className="bg-blue-500 hover:bg-blue-600 transition-colors">
              Restart Quiz
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

