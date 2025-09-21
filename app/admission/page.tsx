import { Navigation } from "@/components/navigation"
import { ScrollingBanner } from "@/components/scrolling-banner"
import { AdmissionForm } from "@/components/admission-form"
import { AdmissionInfo } from "@/components/admission-info"
import { Footer } from "@/components/footer"

export default function AdmissionPage() {
  return (
    <div className="min-h-screen">
      <ScrollingBanner />
      <Navigation />

      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Admission to Ghoslya Childrens Academy</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Join our community of learners and give your child the foundation for a bright future. We welcome students
              from all backgrounds who are eager to learn and grow.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <AdmissionInfo />
            </div>
            <div className="lg:col-span-2">
              <AdmissionForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
