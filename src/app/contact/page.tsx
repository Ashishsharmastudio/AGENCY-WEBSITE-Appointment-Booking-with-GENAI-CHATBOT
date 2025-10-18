"use client";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Calendar, HelpCircle, CreditCard } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [appointment, setAppointment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (!appointment) {
      newErrors.appointment = "Appointment date is required";
    } else if (new Date(appointment) < new Date()) {
      newErrors.appointment = "Please select a future date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus("Please fix the errors below");
      return;
    }

    setIsSubmitting(true);
    setStatus("Sending message...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, appointment }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Message sent successfully! We'll get back to you within 24 hours.");
        setForm({ name: "", email: "", message: "" });
        setAppointment("");
        setErrors({});
      } else {
        setStatus(`❌ ${data.error || "Failed to send message. Please try again."}`);
      }
    } catch {
      setStatus("⚠️ Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-6 pt-24 pb-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left Info Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white"
        >
          <h1 className="text-4xl font-extrabold mb-6">Get in Touch</h1>
          <p className="text-gray-300 mb-6">
            Have a project in mind or want to book a consultation? Fill out the
            form, choose a date, and let’s make it happen.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="text-cyan-400" />
              <span>325 Web Street, Texas City, USA</span>
            </div>
            {/* <div className="flex items-center gap-3">
              <Phone className="text-cyan-400" />
              <span>+1 (555) 123-4567</span>
            </div> */}
            <div className="flex items-center gap-3">
              <Mail className="text-cyan-400" />
              <span>ashishsharmastudio@gmail.com</span>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>

            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="text-cyan-400" />
                <h3 className="font-semibold">How soon do you reply?</h3>
              </div>
              <p className="text-gray-300">We typically respond within 24 hours.</p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="text-cyan-400" />
                <h3 className="font-semibold">Can I book a call before working with you?</h3>
              </div>
              <p className="text-gray-300">
                Yes! Use the booking section to schedule a free consultation.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="text-cyan-400" />
                <h3 className="font-semibold">What payment methods do you accept?</h3>
              </div>
              <p className="text-gray-300">
                We accept credit cards, PayPal, and bank transfers for your convenience.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-white/20 text-white"
        >
          <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border focus:ring focus:ring-cyan-400/30 outline-none text-white ${
                  errors.name ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-cyan-400'
                }`}
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border focus:ring focus:ring-cyan-400/30 outline-none text-white ${
                  errors.email ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-cyan-400'
                }`}
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>
            
            {/* Appointment Date Picker */}
            <div>
              <div className={`flex items-center gap-3 bg-white/5 border rounded-lg px-4 py-3 ${
                errors.appointment ? 'border-red-400' : 'border-white/20'
              }`}>
                <Calendar className="text-cyan-400" />
                <input
                  type="date"
                  name="appointment"
                  value={appointment}
                  onChange={(e) => {
                    setAppointment(e.target.value);
                    if (errors.appointment) {
                      setErrors({ ...errors, appointment: "" });
                    }
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  className="bg-transparent outline-none w-full text-white"
                  required
                />
              </div>
              {errors.appointment && <p className="text-red-400 text-sm mt-1">{errors.appointment}</p>}
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border focus:ring focus:ring-cyan-400/30 outline-none text-white resize-none ${
                  errors.message ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-cyan-400'
                }`}
              />
              {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition ${
              isSubmitting 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-500 to-cyan-400 hover:opacity-90'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Sending...
              </>
            ) : (
              <>
                <Send size={18} /> Send Message
              </>
            )}
          </button>

          {status && (
            <div className={`mt-4 p-3 rounded-lg text-center text-sm ${
              status.includes('✅') 
                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                : status.includes('❌') || status.includes('⚠️')
                ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
            }`}>
              {status}
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
