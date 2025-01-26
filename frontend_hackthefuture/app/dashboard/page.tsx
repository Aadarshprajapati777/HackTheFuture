"use client"

import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { LearningPath } from "@/components/LearningPath"
import { AssessmentQuiz } from "@/components/AssessmentQuiz"
import { DoubtSolver } from "@/components/DoubtSolver"
import { GamificationWidget } from "@/components/GamificationWidget"
import { CareerGuidance } from "@/components/CareerGuidance"
import { Tabs, Tab } from "@nextui-org/react"

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("learning-path")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-white">Your Learning Dashboard</h1>
        <Tabs
          aria-label="Dashboard Options"
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as string)}
        >
          <Tab key="learning-path" title="Learning Path">
            <LearningPath />
          </Tab>
          <Tab key="assessment" title="Assessment">
            <AssessmentQuiz />
          </Tab>
          <Tab key="doubt-solver" title="Doubt Solver">
            <DoubtSolver />
          </Tab>
          <Tab key="gamification" title="Achievements">
            <GamificationWidget />
          </Tab>
          <Tab key="career-guidance" title="Career Guidance">
            <CareerGuidance />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

