"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function GamificationComponent() {
  const achievements = [
    { id: 1, title: "Quick Learner", description: "Completed 5 lessons in one day", icon: "🚀" },
    { id: 2, title: "Streak Master", description: "Maintained a 7-day learning streak", icon: "🔥" },
    { id: 3, title: "Quiz Whiz", description: "Scored 100% on 3 consecutive quizzes", icon: "🧠" },
    { id: 4, title: "Helping Hand", description: "Answered 10 questions in the community forum", icon: "🤝" },
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div className="space-y-4" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.h2 className="text-3xl font-bold text-purple-600" variants={itemVariants}>
        Your Achievements
      </motion.h2>
      <motion.div className="grid gap-4 md:grid-cols-2" variants={containerVariants}>
        {achievements.map((achievement) => (
          <motion.div key={achievement.id} variants={itemVariants}>
            <Card className="bg-white bg-opacity-50 backdrop-blur-lg hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <motion.span
                    className="text-4xl mr-2"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {achievement.icon}
                  </motion.span>
                  {achievement.title}
                </CardTitle>
                <CardDescription>{achievement.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge className="bg-purple-500 hover:bg-purple-600 transition-colors">Earned</Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

