import { Accordion, AccordionItem } from "@nextui-org/react"

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer:
      "To enroll in a course, navigate to the Courses page, select the course you're interested in, and click the 'Enroll Now' button. Follow the prompts to complete your enrollment.",
  },
  {
    question: "Can I interact with other students?",
    answer:
      "Yes! You can interact with other students through our Study Groups feature. Join existing groups or create your own to collaborate and learn together.",
  },
  {
    question: "How does the AI tutor work?",
    answer:
      "Our AI tutor uses advanced natural language processing to understand your questions and provide personalized answers. It can help with course content, problem-solving, and general academic inquiries.",
  },
  {
    question: "What if I'm struggling with a course?",
    answer:
      "If you're struggling, don't worry! You can use the AI tutor for additional help, join a study group for peer support, or reach out to our support team for personalized assistance.",
  },
  {
    question: "How do I track my progress?",
    answer:
      "Your progress is automatically tracked as you complete courses and achieve milestones. Check your dashboard and the Achievements page to see your progress visualized.",
  },
]

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Help & FAQ</h1>
      <Accordion variant="splitted">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} aria-label={faq.question} title={faq.question}>
            <p>{faq.answer}</p>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-8 text-center">
        <p className="text-lg">Still have questions?</p>
        <p className="mt-2">
          Contact our support team at{" "}
          <a href="mailto:support@learnmate.ai" className="text-primary hover:underline">
            support@learnmate.ai
          </a>
        </p>
      </div>
    </div>
  )
}

