import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Award, Heart } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: BookOpen,
      title: "Quality Education",
      description: "Comprehensive curriculum designed to foster critical thinking and creativity in every student.",
    },
    {
      icon: Users,
      title: "Experienced Faculty",
      description: "Dedicated teachers with years of experience in nurturing young minds and building character.",
    },
    {
      icon: Award,
      title: "Excellence in Sports",
      description: "State-of-the-art sports facilities and coaching to develop physical fitness and team spirit.",
    },
    {
      icon: Heart,
      title: "Caring Environment",
      description:
        "A safe, supportive atmosphere where every child feels valued and encouraged to reach their potential.",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Why Choose Ghoslya Childrens Academy?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            We believe in providing holistic education that prepares students for success in life, not just academics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
