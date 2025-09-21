import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-secondary/20 to-accent/20 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Nurturing Young Minds at <span className="text-primary">Ghoslya Childrens Academy</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Located in the heart of Bharni, we provide quality education that shapes tomorrow's leaders through
                innovative learning, character building, and holistic development.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/admission">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Apply for Admission
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 p-8">
              <img
                src="/placeholder-4un5n.png"
                alt="Students learning at Ghoslya Childrens Academy"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
