"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { contactContent } from "@/data/pageContent";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ContactPage() {
  const { eyebrow, title, titleAccent, intro, email, phone, address, hours, faqs } = contactContent;

  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-ink">
      {/* Hero */}
      <header className="border-b border-stone-150 bg-porcelain/60">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-16">
          <span className="eyebrow eyebrow-center mb-4">{eyebrow}</span>
          <h1 className="display-xl text-4xl text-ink sm:text-6xl">
            {title}{" "}
            <span className="candy-gradient-text">{titleAccent}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm font-light leading-relaxed text-stone-500">
            {intro}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Contact form */}
          <div className="lg:col-span-7">
            <h2 className="mb-6 font-serif text-2xl font-bold text-ink">Send Us a Message</h2>

            {submitted ? (
              <div className="flex flex-col items-center gap-4 rounded-[28px] border border-emerald-200 bg-emerald-50/50 px-8 py-12 text-center">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                <h3 className="font-serif text-xl font-bold text-ink">Message Received</h3>
                <p className="max-w-sm text-sm font-medium text-ink/60">
                  Thank you for reaching out. Our concierge team will respond within 1–2 business days.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-deep hover:text-ink"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-sm text-ink focus:border-gold focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-sm text-ink focus:border-gold focus:outline-none"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-phone" className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-sm text-ink focus:border-gold focus:outline-none"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-sm text-ink focus:border-gold focus:outline-none"
                      placeholder="Subject"
                    />
                  
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-sm text-ink focus:border-gold focus:outline-none"
                    placeholder="How can we help you?"
                  />
                </div>
                {error && <p className="text-center text-xs font-medium text-red-500">{error}</p>}
                <button
                  type="submit"
                  className="btn-luxe w-full justify-center sm:w-auto"
                >
                  <span>Send Message</span>
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="lg:col-span-5">
            <div className="card-luxe rounded-[4px] p-8">
              <h2 className="mb-8 font-serif text-xl font-bold text-ink">Concierge Details</h2>
              <ul className="flex flex-col gap-6">
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-porcelain text-gold">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Email</p>
                    <a href={`mailto:${email}`} className="text-sm font-semibold text-ink hover:text-gold-deep">
                      {email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-porcelain text-gold">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Phone</p>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-sm font-semibold text-ink hover:text-gold-deep">
                      {phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-porcelain text-gold">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Studio</p>
                    <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-ink/70">{address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-porcelain text-gold">
                    <Clock className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Hours</p>
                    <ul className="mt-1 flex flex-col gap-1">
                      {hours.map((h) => (
                        <li key={h.day} className="text-xs font-medium text-ink/70">
                          <span className="font-bold text-ink">{h.day}:</span> {h.time}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <section className="mt-20 border-t border-stone-100 pt-20">
          <SectionHeading
            eyebrow="Quick Answers"
            title={
              <>
                Frequently <span className="candy-gradient-text">Asked</span>
              </>
            }
            className="mb-12"
          />
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-[20px] border border-stone-100 bg-white p-6 shadow-[0_4px_20px_rgba(10,10,10,0.03)]">
                <h3 className="font-serif text-base font-bold text-ink">{faq.q}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-ink/60">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
