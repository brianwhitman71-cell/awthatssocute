"use client";

import { useState, useRef } from "react";
import { MailIcon, MapPinIcon, InstagramIcon } from "./icons";

export default function ContactSection() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }

  function removeImage() {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData();
    data.append("firstName", formState.firstName);
    data.append("lastName", formState.lastName);
    data.append("email", formState.email);
    data.append("message", formState.message);
    if (image) data.append("image", image);

    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative py-8 lg:py-10 px-6 overflow-hidden"
    >
      {/* Background blob */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 50%, oklch(0.90 0.05 350 / 0.18) 0%, transparent 70%)",
        }}
      />

      {/* Section header banner */}
      <div
        className="text-center mb-14 overflow-hidden -mx-6"
        style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem", background: "oklch(0.94 0.03 258 / 0.4)" }}
      >
        <p
          className="text-xs font-700 tracking-[0.3em] text-primary uppercase mb-3"
          style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
        >
          Get in touch
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-800 text-foreground mb-4">
          Contact Me
        </h2>
        <div className="w-16 h-0.5 bg-primary mx-auto rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-border">
              <h3 className="font-heading text-xl font-700 text-foreground mb-6">
                Let&apos;s Create Something Cute
              </h3>
              <p
                className="text-sm text-foreground/65 leading-relaxed mb-8"
                style={{
                  fontFamily: "var(--font-nunito), Nunito, sans-serif",
                }}
              >
                Have a question, want to place a custom order, or just want to
                say hi? I&apos;d love to hear from you! Fill out the form and
                I&apos;ll get back to you as soon as possible.
              </p>

              <div className="flex flex-col gap-4">
                <a
                  href="mailto:awthatssocutecrafts@gmail.com"
                  className="flex items-center gap-3 text-sm text-foreground/70 hover:text-primary transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MailIcon className="w-4 h-4 text-primary" />
                  </div>
                  <span style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}>
                    awthatssocutecrafts@gmail.com
                  </span>
                </a>

                <div className="flex items-center gap-3 text-sm text-foreground/70">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPinIcon className="w-4 h-4 text-primary" />
                  </div>
                  <span style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}>
                    Atlanta, GA
                  </span>
                </div>

                <a
                  href="https://www.instagram.com/aw.thatssocute/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-foreground/70 hover:text-primary transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <InstagramIcon className="w-4 h-4 text-primary" />
                  </div>
                  <span style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}>
                    @aw.thatssocute
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-border">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-2xl">🧶</span>
                </div>
                <h3 className="font-heading text-xl font-700 text-foreground mb-2">
                  Message Sent!
                </h3>
                <p
                  className="text-sm text-foreground/65"
                  style={{
                    fontFamily: "var(--font-nunito), Nunito, sans-serif",
                  }}
                >
                  Thank you for reaching out. I&apos;ll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="firstName"
                      className="text-xs font-700 tracking-wider text-foreground/60 uppercase"
                      style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formState.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
                      placeholder="First name"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="lastName"
                      className="text-xs font-700 tracking-wider text-foreground/60 uppercase"
                      style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formState.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-700 tracking-wider text-foreground/60 uppercase"
                    style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs font-700 tracking-wider text-foreground/60 uppercase"
                    style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                    style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
                    placeholder="Tell me what you're looking for..."
                  />
                </div>

                {/* Image upload */}
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-700 tracking-wider text-foreground/60 uppercase"
                    style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
                  >
                    Reference Photo <span className="normal-case font-400 tracking-normal">(optional)</span>
                  </label>

                  {imagePreview ? (
                    <div className="relative rounded-xl overflow-hidden border border-border bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-40 object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 w-7 h-7 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                        aria-label="Remove image"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                      <div
                        className="px-3 py-1.5 bg-black/20 text-white text-xs truncate"
                        style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
                      >
                        {image?.name}
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex flex-col items-center justify-center gap-2 w-full py-6 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-foreground/40 hover:text-primary/60">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="3"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <path d="M21 15l-5-5L5 21"/>
                      </svg>
                      <span
                        className="text-xs font-600 pointer-events-none"
                        style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
                      >
                        Upload a reference image
                      </span>
                      <span
                        className="text-[10px] pointer-events-none"
                        style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
                      >
                        JPG, PNG, GIF up to 10MB
                      </span>
                    </div>
                  )}
                </div>

                {error && (
                  <p
                    className="text-red-500 text-xs text-center"
                    style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white font-700 tracking-widest text-sm py-3.5 rounded-full hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                  style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
                >
                  {loading ? "SENDING..." : "SEND"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
