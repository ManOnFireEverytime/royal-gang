"use client";

import { useState, FormEvent } from "react";
import PageWrapper from "../_components/PageWrapper";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "";
    text: string;
  }>({ type: "", text: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: "", text: "" });

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage({
        type: "error",
        text: "Please fill in all required fields",
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatusMessage({
        type: "error",
        text: "Please enter a valid email address",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        "https://backend.royalgangchamber.com/contact.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setStatusMessage({
          type: "success",
          text: data.message,
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setStatusMessage({
          type: "error",
          text: data.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatusMessage({
        type: "error",
        text: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
      // Clear message after 5 seconds
      setTimeout(() => {
        setStatusMessage({ type: "", text: "" });
      }, 5000);
    }
  };

  return (
    <PageWrapper>
      <div className="space-y-10 py-5">
        <div className="space-y-8">
          <h2 className="text-center text-4xl font-bold uppercase text-saddleBrown">
            CONTACT US
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-center">
            For sizing guidance, order support, or general enquiries reach out
            below. Our Team will respond within 24–48 hours.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full flex-grow space-y-6 px-4 lg:w-1/2"
        >
          {/* Status Message */}
          {statusMessage.text && (
            <div
              className={`rounded border p-4 ${
                statusMessage.type === "success"
                  ? "border-green-400 bg-green-100 text-green-700"
                  : "border-red-400 bg-red-100 text-red-700"
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          <div className="flex flex-col gap-x-4 gap-y-4 md:flex-row">
            <input
              className="flex-grow border px-2 py-4 outline-none focus:border-saddleBrown"
              placeholder="Name *"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />

            <input
              className="flex-grow border px-2 py-4 outline-none focus:border-saddleBrown"
              placeholder="Email *"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <input
            className="w-full flex-grow border px-2 py-4 outline-none focus:border-saddleBrown"
            placeholder="Phone Number (Optional)"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={isSubmitting}
          />

          <textarea
            className="min-h-96 w-full flex-grow border px-2 py-4 outline-none focus:border-saddleBrown"
            placeholder="Message *"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full border border-black bg-saddleBrown p-2 text-sm uppercase text-white transition-opacity ${
              isSubmitting ? "cursor-not-allowed opacity-50" : "hover:opacity-90"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </PageWrapper>
  );
}