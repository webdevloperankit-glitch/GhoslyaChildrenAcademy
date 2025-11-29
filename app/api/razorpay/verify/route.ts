import { NextResponse } from "next/server"
import { Resend } from "resend"
import crypto from "crypto"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customer, order, courses } = body

    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex")

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, error: "Invalid payment signature" }, { status: 400 })
    }

    // Payment verified - send email notification
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; background-color: #000; color: #fff; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #121212; border-radius: 8px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #006600, #00cc00); padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; color: #fff; }
            .content { padding: 30px; }
            .payment-badge { background: #00cc00; color: #000; padding: 10px 20px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 20px; }
            .info-row { padding: 12px 0; border-bottom: 1px solid #333; }
            .label { color: #ff0033; font-weight: bold; font-size: 12px; text-transform: uppercase; }
            .value { margin-top: 5px; font-size: 16px; }
            .total { font-size: 32px; color: #00cc00; text-align: center; margin: 20px 0; }
            .payment-info { background: #1a1a1a; padding: 15px; border-radius: 4px; margin: 20px 0; }
            .payment-info p { margin: 5px 0; font-size: 12px; color: #888; }
            .courses { background: #000; padding: 15px; border-radius: 4px; margin-top: 20px; }
            .course-item { padding: 8px 0; border-bottom: 1px solid #222; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Payment Successful!</h1>
            </div>
            <div class="content">
              <div style="text-align: center;">
                <span class="payment-badge">PAID</span>
              </div>
              <div class="total">₹${order.amount}</div>
              
              <div class="payment-info">
                <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
                <p><strong>Order ID:</strong> ${razorpay_order_id}</p>
              </div>
              
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
              <p>Thank you for your purchase!</p>
            </div>
          </div>
        </body>
      </html>
    `

    await resend.emails.send({
      from: "GrowUp Academy <onboarding@resend.dev>",
      to: ["webdevloperankit@gmail.com"],
      subject: `Payment Received: ${order.description} - ₹${order.amount}`,
      html: emailHtml,
    })

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      paymentId: razorpay_payment_id,
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 500 })
  }
}
