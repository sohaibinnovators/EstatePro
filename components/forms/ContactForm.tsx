"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      next.message = "Please share a bit more detail (10+ characters).";
    }
    setErrors(next);
    if (Object.keys(next).length) {
      setSuccess("");
      return;
    }
    setSuccess("Thanks — your message is ready (demo only, not sent).");
    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "general",
      message: "",
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-xl border border-border bg-white p-6 shadow-[var(--shadow-sm)] md:p-8"
    >
      <h2 className="font-display text-2xl font-semibold text-navy">
        Send a message
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Input
          label="Full name"
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
          required
        />
        <Input
          label="Phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <Select
          label="Subject"
          name="subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          options={[
            { value: "general", label: "General inquiry" },
            { value: "buy", label: "Buying a home" },
            { value: "rent", label: "Renting" },
            { value: "list", label: "Listing a property" },
            { value: "agent", label: "Speak with an agent" },
          ]}
        />
      </div>
      <div className="mt-4">
        <Textarea
          label="Message"
          name="message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          error={errors.message}
          required
        />
      </div>
      <Button type="submit" variant="gold" className="mt-6">
        Send Message
      </Button>
      {success ? <p className="mt-3 text-sm text-navy-muted">{success}</p> : null}
    </form>
  );
}
