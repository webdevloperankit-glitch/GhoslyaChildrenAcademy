import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GraduationCap, Target, Heart, Star } from "lucide-react"

export function AboutSection() {
  const values = [
    {
      icon: GraduationCap,
      title: "Academic Excellence",
      description: "Committed to providing high-quality education that prepares students for future success.",
    },
    {
      icon: Target,
      title: "Goal-Oriented Learning",
      description: "Focused approach to help each student achieve their personal and academic goals.",
    },
    {
      icon: Heart,
      title: "Caring Community",
      description: "A supportive environment where every student feels valued and encouraged to grow.",
    },
    {
      icon: Star,
      title: "Character Building",
      description: "Developing strong moral values and leadership qualities in our students.",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-balance">About Ghoslya Childrens Academy</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Located in the heart of Bharni, Ghoslya Childrens Academy has been a beacon of educational excellence,
                nurturing young minds and shaping future leaders through innovative teaching methods and holistic
                development programs.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our dedicated faculty and state-of-the-art facilities create an environment where students can explore
                their potential, develop critical thinking skills, and build the confidence needed to succeed in an
                ever-changing world.
              </p>
            </div>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Learn More About Our Story
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-balance">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
