"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PersonalizedLearningPlan from "@/components/PersonalizedLearningPlan"
import GamificationComponent from "@/components/GamificationComponent"
import DoubtSolver from "@/components/DoubtSolver"
import AdaptiveQuiz from "@/components/AdaptiveQuiz"

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview")

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
    <main className="min-h-screen bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100 p-4">
      <motion.div className="container mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.h1 className="text-4xl font-bold mb-6 text-blue-600" variants={itemVariants}>
          Welcome to LearnMate AI
        </motion.h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-white bg-opacity-50 backdrop-blur-lg rounded-full p-1">
            <TabsTrigger value="overview" className="rounded-full">
              Overview
            </TabsTrigger>
            <TabsTrigger value="learning-plan" className="rounded-full">
              Learning Plan
            </TabsTrigger>
            <TabsTrigger value="gamification" className="rounded-full">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="doubt-solver" className="rounded-full">
              Doubt Solver
            </TabsTrigger>
            <TabsTrigger value="quiz" className="rounded-full">
              Adaptive Quiz
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={containerVariants}>
              <motion.div variants={itemVariants}>
                <Card className="bg-white bg-opacity-50 backdrop-blur-lg hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Progress</CardTitle>
                    <CardDescription>Your learning progress this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-blue-600">78%</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="bg-white bg-opacity-50 backdrop-blur-lg hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Streak</CardTitle>
                    <CardDescription>Your current learning streak</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-green-600">7 days</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="bg-white bg-opacity-50 backdrop-blur-lg hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Points</CardTitle>
                    <CardDescription>Your total points earned</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-purple-600">1,234</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="bg-white bg-opacity-50 backdrop-blur-lg hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Next Goal</CardTitle>
                    <CardDescription>Your upcoming learning milestone</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-pink-600">Complete Python Basics</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
          <TabsContent value="learning-plan">
            <PersonalizedLearningPlan />
          </TabsContent>
          <TabsContent value="gamification">
            <GamificationComponent />
          </TabsContent>
          <TabsContent value="doubt-solver">
            <DoubtSolver />
          </TabsContent>
          <TabsContent value="quiz">
            <AdaptiveQuiz />
          </TabsContent>
        </Tabs>
      </motion.div>
    </main>
  )
}

