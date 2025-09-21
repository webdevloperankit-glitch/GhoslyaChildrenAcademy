import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, FileText, Users } from "lucide-react"

export function AdmissionInfo() {
  const admissionSteps = [
    {
      icon: FileText,
      title: "Submit Application",
      description: "Complete and submit the online admission form with all required documents.",
    },
    {
      icon: Users,
      title: "Interview Process",
      description: "Attend a brief interview with the student and parents/guardians.",
    },
    {
      icon: CheckCircle,
      title: "Application Review",
      description: "Our admissions team will review your application and contact you within 5-7 days.",
    },
    {
      icon: Calendar,
      title: "Enrollment",
      description: "Upon acceptance, complete the enrollment process and fee payment.",
    },
  ]

  const requirements = [
    "Birth certificate of the student",
    "Previous school records (if applicable)",
    "Passport-size photographs (4 copies)",
    "Address proof",
    "Medical certificate",
    "Transfer certificate (for students from other schools)",
  ]

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Admission Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {admissionSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Required Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {requirements.map((requirement, index) => (
              <li key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-primary/5">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Important Dates</h3>
          <div className="space-y-2">
            <p>
              <strong>Application Deadline:</strong> March 31, 2024
            </p>
            <p>
              <strong>Interview Period:</strong> April 1-15, 2024
            </p>
            <p>
              <strong>Results Announcement:</strong> April 30, 2024
            </p>
            <p>
              <strong>Academic Year Starts:</strong> June 1, 2024
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
