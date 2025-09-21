import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">GCA</span>
              </div>
              <span className="font-bold text-lg">Ghoslya Childrens Academy</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Nurturing young minds in Bharni with quality education, character building, and holistic development since
              our establishment.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 hover:text-primary-foreground/80 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 hover:text-primary-foreground/80 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 hover:text-primary-foreground/80 cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 hover:text-primary-foreground/80 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/admission"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Admissions
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Programs</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Pre-Primary (Nursery - UKG)</li>
              <li>Primary (Grades 1-5)</li>
              <li>Secondary (Grades 6-10)</li>
              <li>Sports & Athletics</li>
              <li>Arts & Culture</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-primary-foreground/80">
                  <p>Main Road, Bharni</p>
                  <p>District Bharni, State</p>
                  <p>PIN: 123456</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-primary-foreground/80">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-primary-foreground/80">info@ghoslyaacademy.edu.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/80">© 2024 Ghoslya Childrens Academy Bharni. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
