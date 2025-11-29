import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; background-color: #000; color: #fff; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #121212; border-radius: 8px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #330000, #ff0033); padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { padding: 30px; }
            .info-row { padding: 12px 0; border-bottom: 1px solid #333; }
            .label { color: #ff0033; font-weight: bold; font-size: 12px; text-transform: uppercase; }
            .value { margin-top: 5px; font-size: 16px; }
            .message-box { background: #000; padding: 20px; border-radius: 4px; margin-top: 20px; border-left: 3px solid #ff0033; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Message</h1>
            </div>
            <div class="content">
              <div class="info-row">
                <div class="label">From</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="info-row">
                <div class="label">Email</div>
                <div class="value">${email}</div>
              </div>
              
              ${
                phone
                  ? `
              <div class="info-row">
                <div class="label">Phone</div>
                <div class="value">${phone}</div>
              </div>
              `
                  : ""
              }
              
              <div class="info-row">
                <div class="label">Subject</div>
                <div class="value">${subject}</div>
              </div>
              
              <div class="message-box">
                <div class="label">Message</div>
                <div class="value" style="margin-top: 10px; line-height: 1.6;">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>GrowUp Academy - Contact Form Submission</p>
            </div>
          </div>
        </body>
      </html>
    `

    const { data, error } = await resend.emails.send({
      from: "GrowUp Academy <onboarding@resend.dev>",
      to: ["webdevloperankit@gmail.com"],
      subject: `Contact: ${subject}`,
      html: emailHtml,
      replyTo: email,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Contact email error:", error)
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 })
  }
}
