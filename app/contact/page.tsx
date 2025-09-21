import { Navigation } from "@/components/navigation"
import { ScrollingBanner } from "@/components/scrolling-banner"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { Footer } from "@/components/footer"
import { MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ScrollingBanner />
      <Navigation />

      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Contact Ghoslya Childrens Academy</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Located in Bharni, we're here to answer your questions and help you learn more about our educational
              programs and admission process.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ContactInfo />
            <ContactForm />
          </div>

          {/* Map Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-8">Find Us</h2>
            <div className="bg-muted/30 rounded-2xl p-8 text-center">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">School Location</h3>
                  <p className="text-muted-foreground">Interactive map showing our location in Bharni</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
