import type { ToolHandler } from "@modelcontextprotocol/sdk";
import fs from "fs";
import nodemailer from "nodemailer";

const resume = JSON.parse(fs.readFileSync("./resume.json", "utf-8"));

// CV Chat
export const cvChatHandler: ToolHandler = async (args) => {
  try {
    const question = args?.question?.toLowerCase() || "";

    if (question.includes("last position") || question.includes("recent role")) {
      const last = resume.positions[0];
      return { content: [{ type: "text", text: `Your last role was ${last.role} at ${last.company}` }] };
    }

    if (question.includes("skills")) {
      return { content: [{ type: "text", text: `Your skills are: ${resume.skills.join(", ")}` }] };
    }

    return { content: [{ type: "text", text: "I don't know the answer to that yet." }] };

  } catch (err: any) {
    console.error("cvChatHandler error:", err);
    throw new Error("Failed to process CV chat");
  }
};

// Send email notification
export const emailHandler: ToolHandler = async (args) => {
  if (!args || !args.recipient || !args.subject || !args.body) {
    throw new Error("Missing required fields: recipient, subject, body");
  }

  try {
    // const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "erandayapayasith@gmail.com",
        pass: "bzbiovuiscldfmwa",
      },
    });

    const info = await transporter.sendMail({
      from: '"CV MCP Server" <no-reply@example.com>',
      to: args.recipient,
      subject: args.subject,
      text: args.body,
    });

    console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));

    return { content: [{ type: "text", text: `Email sent! Preview URL: ${nodemailer.getTestMessageUrl(info)}` }] };
  } catch (err: any) {
    console.error("emailHandler error:", err);
    throw new Error("Failed to send email");
  }
};