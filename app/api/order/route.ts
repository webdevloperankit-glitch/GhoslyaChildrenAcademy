import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customer, order, courses } = body

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
            .total { font-size: 32px; color: #ff0033; text-align: center; margin: 20px 0; }
            .courses { background: #000; padding: 15px; border-radius: 4px; margin-top: 20px; }
            .course-item { padding: 8px 0; border-bottom: 1px solid #222; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Order Received!</h1>
            </div>
            <div class="content">
              <div class="total">₹${order.amount}</div>
              
              <div class="info-row">
                <div class="label">Customer Name</div>
                <div class="value">${customer.name}</div>
              </div>
              
              <div class="info-row">
                <div class="label">Email</div>
                <div class="value">${customer.email}</div>
              </div>
              
              <div class="info-row">
                <div class="label">Phone</div>
                <div class="value">${customer.phone}</div>
              </div>
              
              <div class="info-row">
                <div class="label">Address</div>
                <div class="value">${customer.address}</div>
              </div>
              
              <div class="info-row">
                <div class="label">Order Description</div>
                <div class="value">${order.description}</div>
              </div>
              
              <div class="courses">
                <div class="label">Courses Purchased</div>
                ${courses.map((c: string) => `<div class="course-item">• ${c}</div>`).join("")}
              </div>
            </div>
            <div class="footer">
              <p>GrowUp Academy - Premium Learning Platform</p>
            </div>
          </div>
        </body>
      </html>
    `

    const { data, error } = await resend.emails.send({
      from: "GrowUp Academy <onboarding@resend.dev>",
      to: ["webdevloperankit@gmail.com"],
      subject: `New Order: ${order.description} - ₹${order.amount}`,
      html: emailHtml,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Order email error:", error)
    return NextResponse.json({ success: false, error: "Failed to send order notification" }, { status: 500 })
  }
}
