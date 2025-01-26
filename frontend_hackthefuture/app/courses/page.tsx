import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react"

const courses = [
  {
    id: 1,
    title: "Introduction to AI",
    image: "https://source.unsplash.com/random/300x200?ai",
    description: "Learn the basics of Artificial Intelligence and its applications.",
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    image: "https://source.unsplash.com/random/300x200?coding",
    description: "Master HTML, CSS, and JavaScript in this comprehensive course.",
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    image: "https://source.unsplash.com/random/300x200?data",
    description: "Explore data analysis, visualization, and machine learning techniques.",
  },
  {
    id: 4,
    title: "Mobile App Development",
    image: "https://source.unsplash.com/random/300x200?mobile",
    description: "Build iOS and Android apps using React Native.",
  },
]

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Available Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="max-w-sm">
            <CardBody className="p-0">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-[200px] object-cover"
              />
            </CardBody>
            <CardFooter className="flex-col items-start">
              <h5 className="text-lg font-bold">{course.title}</h5>
              <p className="text-sm text-gray-500 mt-1">{course.description}</p>
              <Button color="primary" className="mt-4 w-full">
                Enroll Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

