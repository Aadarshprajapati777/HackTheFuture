import { Card, CardBody, Progress } from "@nextui-org/react"
import { Award, Book, Code, Database } from "lucide-react"

const achievements = [
  {
    id: 1,
    title: "AI Master",
    description: "Complete all AI courses",
    progress: 75,
    icon: <Database className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "Coding Ninja",
    description: "Solve 100 coding challenges",
    progress: 60,
    icon: <Code className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "Knowledge Seeker",
    description: "Read 50 articles",
    progress: 90,
    icon: <Book className="w-6 h-6" />,
  },
  {
    id: 4,
    title: "Top Contributor",
    description: "Help 20 students in forums",
    progress: 40,
    icon: <Award className="w-6 h-6" />,
  },
]

export default function AchievementsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Achievements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement) => (
          <Card key={achievement.id} className="w-full">
            <CardBody className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">{achievement.icon}</div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{achievement.title}</h3>
                <p className="text-sm text-gray-500">{achievement.description}</p>
                <Progress
                  color="secondary"
                  size="sm"
                  value={achievement.progress}
                  className="mt-2"
                  showValueLabel={true}
                />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

