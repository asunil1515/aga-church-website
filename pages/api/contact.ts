import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle CORS
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.ALLOWED_ORIGIN || "*"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Content-Type", "application/json");

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Parse body
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({
          error:
            "Missing required fields: name, email, and message are required",
        });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Basic sanitization to prevent XSS
    const cleanName = name.replace(/<[^>]*>/g, "");
    const cleanEmail = email.replace(/<[^>]*>/g, "");
    const cleanPhone = (phone || "Not provided").replace(/<[^>]*>/g, "");
    const cleanMessage = message.replace(/<[^>]*>/g, "");

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "aga.assembly@gmail.com",
      subject: `New Contact Form Submission from ${cleanName}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${cleanName}</p>
        <p><strong>Email:</strong> ${cleanEmail}</p>
        <p><strong>Phone:</strong> ${cleanPhone}</p>
        <p><strong>Message:</strong></p>
        <p>${cleanMessage}</p>
      `,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: cleanEmail,
      subject: "Thank You for Contacting Us",
      html: `
        <h3>Thank You, ${cleanName}!</h3>
        <p>We have received your message and will respond as soon as possible.</p>
        <p><strong>Your Message:</strong> ${cleanMessage}</p>
        <p style="font-size: 12px; color: #666;">This is an automated response. Please do not reply.</p>
      `,
    });

    // Log submission
    console.log(
      `Contact form submission received from ${cleanName} at ${new Date().toISOString()}`
    );

    // Send JSON response to frontend
    return res
      .status(200)
      .json({
        message: "Message sent successfully. We will get back to you soon!",
      });
  } catch (error) {
    console.error("Email send error:", error);
    return res
      .status(500)
      .json({ error: "Failed to send message. Please try again later." });
  }
}