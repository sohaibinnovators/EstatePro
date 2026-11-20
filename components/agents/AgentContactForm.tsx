"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { saveInquiry } from "@/lib/inquiries";
import { pushNotification } from "@/lib/notifications";
import type { Property } from "@/lib/types";

export function AgentContactForm({
  agentId,
  agentName,
  properties = [],
}: {
  agentId: string;
  agentName: string;
  properties?: Property[];
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [message, setMessage] = useState(
    `Hi ${agentName}, I'd like to learn more about your available listings.`,
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

    const selected = properties.find((p) => p.id === propertyId);

    setSubmitting(true);
    try {
      saveInquiry({
        type: "agent",
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        agentId,
        agentName,
        propertyId: selected?.id,
        propertySlug: selected?.slug,
        propertyTitle: selected?.title,
        propertyRef: selected ? `EP-${selected.id.toUpperCase()}` : undefined,
      });
      pushNotification({
        type: "inquiry",
        title: "Demo inquiry submitted",
        message: `Local inquiry saved for ${agentName}. No message was sent to the agent.`,
        href: "/dashboard/inquiries",
      });
      setSuccess(
        "Message saved locally for this demo. No email was sent to the agent.",
      );
      setName("");
      setEmail("");
      setPropertyId("");
      setMessage(
        `Hi ${agentName}, I'd like to learn more about your available listings.`,
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-xl border border-border bg-white p-6 shadow-[var(--shadow-sm)]"
    >
      <h2 className="font-display text-2xl font-semibold text-navy">
        Contact {agentName}
      </h2>
      <p className="mt-2 text-sm text-muted">
        Demo inquiry form — submissions stay in your browser only.
      </p>
      <div className="mt-5 space-y-3">
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
        {properties.length > 0 ? (
          <Select
            label="Relevant property (optional)"
            name="property"
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            options={[
              { value: "", label: "Select a listing" },
              ...properties.map((p) => ({
                value: p.id,
                label: p.title,
              })),
            ]}
          />
        ) : null}
        <Textarea
          label="Message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          error={errors.message}
          required
        />
        <Button type="submit" variant="gold" disabled={submitting}>
          {submitting ? "Saving…" : "Send Message"}
        </Button>
        {success ? <p className="text-sm text-navy-muted">{success}</p> : null}
      </div>
    </form>
  );
}
