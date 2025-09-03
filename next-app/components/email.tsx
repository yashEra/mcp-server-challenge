"use client";

import { useState, ChangeEvent, FormEvent } from "react";

export function EmailForm() {
  const [formData, setFormData] = useState({
    recipient: "",
    subject: "",
    body: "",
    submissionStatus: "" as "success" | "error" | "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormData({ ...formData, submissionStatus: "" });

    try {
      const res = await fetch("http://localhost:4000/tool/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          arguments: {
            recipient: formData.recipient,
            subject: formData.subject,
            body: formData.body,
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to send email");

      setFormData({
        recipient: "",
        subject: "",
        body: "",
        submissionStatus: "success",
      });
    } catch (err) {
      setFormData({ ...formData, submissionStatus: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        name="recipient"
        placeholder="Recipient Email"
        value={formData.recipient}
        onChange={handleChange}
        className="border border-gray-400 p-3 rounded-lg focus:border-indigo-500 focus:outline-none"
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        className="border border-gray-400 p-3 rounded-lg focus:border-indigo-500 focus:outline-none"
        required
      />
      <textarea
        name="body"
        placeholder="Message body"
        value={formData.body}
        onChange={handleChange}
        className="border border-gray-400 p-3 rounded-lg focus:border-indigo-500 focus:outline-none"
        rows={6}
        required
      />
      <button
        type="submit"
        className="bg-indigo-500 text-white py-3 px-6 rounded-lg hover:bg-indigo-600 transition"
      >
        Send Notification
      </button>

      {formData.submissionStatus === "success" && (
        <p className="text-green-500">Email sent successfully!</p>
      )}
      {formData.submissionStatus === "error" && (
        <p className="text-red-500">Failed to send the email. Try again.</p>
      )}
    </form>
  );
}
