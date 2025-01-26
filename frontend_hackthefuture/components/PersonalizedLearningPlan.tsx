"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export default function PersonalizedLearningPlan() {
  const learningPlan = [
    { id: 1, title: "Python Basics", progress: 80 },
    { id: 2, title: "Data Structures", progress: 60 },
    { id: 3, title: "Algorithms", progress: 40 },
    { id: 4, title: "Web Development", progress: 20 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div className="space-y-4" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.h2 className="text-3xl font-bold text-blue-600" variants={itemVariants}>
        Your Personalized Learning Plan
      </motion.h2>
      {learningPlan.map((item) => (
        <motion.div key={item.id} variants={itemVariants}>
          <Card className="bg-white bg-opacity-50 backdrop-blur-lg hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>Your current progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={item.progress} className="mb-2" />
              <p className="text-sm text-gray-600 mb-2">{item.progress}% complete</p>
              <Button className="bg-blue-500 hover:bg-blue-600 transition-colors">Continue Learning</Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

