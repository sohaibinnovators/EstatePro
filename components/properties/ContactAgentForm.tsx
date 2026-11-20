"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { saveInquiry } from "@/lib/inquiries";
import { pushNotification } from "@/lib/notifications";

export function ContactAgentForm({
  agentId,
  agentName,
  propertyId,
  propertySlug,
  propertyTitle,
  propertyRef,
}: {
  agentId: string;
  agentName: string;
  propertyId: string;
  propertySlug: string;
  propertyTitle: string;
  propertyRef: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    `Hi ${agentName}, I'm interested in ${propertyTitle} (${propertyRef}). Please share more details.`,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Name is required.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email.";
    }
    if (!message.trim() || message.trim().length < 10) {
      next.message = "Please enter a message (10+ characters).";
    }
    return next;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      setSuccess("");
      return;
    }

    setSubmitting(true);
    try {
      saveInquiry({
        type: "property",
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        message: message.trim(),
        agentId,
        agentName,
        propertyId,
        propertySlug,
        propertyTitle,
        propertyRef,
      });
      pushNotification({
        type: "inquiry",
        title: "Demo inquiry submitted",
        message: `Local inquiry saved for ${propertyTitle}. No message was sent to an agent.`,
        href: "/dashboard/inquiries",
      });
      setSuccess(
        "Inquiry saved locally for this demo. No email was sent to an agent.",
      );
      setName("");
      setEmail("");
      setPhone("");
      setMessage(
        `Hi ${agentName}, I'm interested in ${propertyTitle} (${propertyRef}). Please share more details.`,
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      <p className="rounded-md bg-bg px-3 py-2 text-xs text-muted">
        Property reference:{" "}
        <span className="font-semibold text-navy">{propertyRef}</span>
      </p>
      <Input
        label="Full name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        required
      />
      <Input
        label="Phone (optional)"
        name="phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Textarea
        label="Message"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        error={errors.message}
        required
      />
      <Button
        type="submit"
        variant="gold"
        className="w-full"
        disabled={submitting}
      >
        {submitting ? "Saving…" : "Send Inquiry"}
      </Button>
      {success ? <p className="text-sm text-navy-muted">{success}</p> : null}
    </form>
  );
}
