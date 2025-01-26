import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
          <CardDescription>Your learning progress this week</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">78%</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Streak</CardTitle>
          <CardDescription>Your current learning streak</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">7 days</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Points</CardTitle>
          <CardDescription>Your total points earned</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">1,234</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Next Goal</CardTitle>
          <CardDescription>Your upcoming learning milestone</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">Complete Python Basics</p>
        </CardContent>
      </Card>
    </div>
  )
}

