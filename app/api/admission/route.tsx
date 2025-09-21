import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const admissionData = {
      // Student Information
      studentFirstName: formData.get("studentFirstName") as string,
      studentLastName: formData.get("studentLastName") as string,
      dateOfBirth: formData.get("dateOfBirth") as string,
      gender: formData.get("gender") as string,
      grade: formData.get("grade") as string,

      // Parent Information
      parentFirstName: formData.get("parentFirstName") as string,
      parentLastName: formData.get("parentLastName") as string,
      parentEmail: formData.get("parentEmail") as string,
      parentPhone: formData.get("parentPhone") as string,
      occupation: formData.get("occupation") as string,
      address: formData.get("address") as string,

      // Previous School
      previousSchool: formData.get("previousSchool") as string,
      lastGrade: formData.get("lastGrade") as string,
      reasonForTransfer: formData.get("reasonForTransfer") as string,

      // Additional Information
      medicalConditions: formData.get("medicalConditions") as string,
      additionalComments: formData.get("additionalComments") as string,
    }

    const { data, error } = await resend.emails.send({
      from: "Ghoslya Childrens Academy <onboarding@resend.dev>", // Default Resend sender
      to: ["webdevloperankit@gmail.com"],
      subject: `New Admission Application: ${admissionData.studentFirstName} ${admissionData.studentLastName}`,
      html: `
        <h2>New Admission Application</h2>
        
        <h3>Student Information</h3>
        <p><strong>Name:</strong> ${admissionData.studentFirstName} ${admissionData.studentLastName}</p>
        <p><strong>Date of Birth:</strong> ${admissionData.dateOfBirth}</p>
        <p><strong>Gender:</strong> ${admissionData.gender}</p>
        <p><strong>Grade Applying For:</strong> ${admissionData.grade}</p>
        
        <h3>Parent/Guardian Information</h3>
        <p><strong>Name:</strong> ${admissionData.parentFirstName} ${admissionData.parentLastName}</p>
        <p><strong>Email:</strong> ${admissionData.parentEmail}</p>
        <p><strong>Phone:</strong> ${admissionData.parentPhone}</p>
        <p><strong>Occupation:</strong> ${admissionData.occupation || "Not provided"}</p>
        <p><strong>Address:</strong> ${admissionData.address}</p>
        
        ${
          admissionData.previousSchool
            ? `
        <h3>Previous School Information</h3>
        <p><strong>Previous School:</strong> ${admissionData.previousSchool}</p>
        <p><strong>Last Grade Completed:</strong> ${admissionData.lastGrade || "Not provided"}</p>
        <p><strong>Reason for Transfer:</strong> ${admissionData.reasonForTransfer || "Not provided"}</p>
        `
            : ""
        }
        
        ${
          admissionData.medicalConditions || admissionData.additionalComments
            ? `
        <h3>Additional Information</h3>
        ${admissionData.medicalConditions ? `<p><strong>Medical Conditions:</strong> ${admissionData.medicalConditions}</p>` : ""}
        ${admissionData.additionalComments ? `<p><strong>Additional Comments:</strong> ${admissionData.additionalComments}</p>` : ""}
        `
            : ""
        }
        
        <hr>
        <p><em>This application was submitted from the Ghoslya Childrens Academy website.</em></p>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ success: false, message: "Failed to submit application" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Application submitted successfully" })
  } catch (error) {
    console.error("Error sending admission email:", error)
    return NextResponse.json({ success: false, message: "Failed to submit application" }, { status: 500 })
  }
}
