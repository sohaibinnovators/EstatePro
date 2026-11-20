"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

export function ListPropertyForm() {
  const [form, setForm] = useState({
    title: "",
    status: "sale",
    type: "house",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.title.trim()) next.title = "Property title is required.";
    if (!form.price || Number(form.price) <= 0) next.price = "Enter a valid price.";
    if (!form.location.trim()) next.location = "Location is required.";
    if (!form.description.trim() || form.description.trim().length < 20) {
      next.description = "Add a fuller description (20+ characters).";
    }
    if (!form.name.trim()) next.name = "Your name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email.";
    }
    setErrors(next);
    if (Object.keys(next).length) {
      setSuccess("");
      return;
    }
    setSuccess(
      "Listing details validated (demo only — no backend submission).",
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <section>
        <h2 className="font-display text-2xl font-semibold text-navy">
          Property details
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              label="Property title"
              name="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              error={errors.title}
              required
            />
          </div>
          <Select
            label="Listing type"
            name="status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            options={[
              { value: "sale", label: "For Sale" },
              { value: "rent", label: "For Rent" },
            ]}
          />
          <Select
            label="Property type"
            name="type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            options={[
              { value: "house", label: "House" },
              { value: "apartment", label: "Apartment" },
              { value: "plot", label: "Plot" },
              { value: "commercial", label: "Commercial" },
            ]}
          />
          <Input
            label="Price (PKR)"
            name="price"
            type="number"
            min={0}
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            error={errors.price}
            required
          />
          <Input
            label="Location"
            name="location"
            placeholder="e.g. DHA Lahore, Karachi"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            error={errors.location}
            required
          />
          <Input
            label="Bedrooms"
            name="bedrooms"
            type="number"
            min={0}
            value={form.bedrooms}
            onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
          />
          <Input
            label="Bathrooms"
            name="bathrooms"
            type="number"
            min={0}
            step={0.5}
            value={form.bathrooms}
            onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
          />
          <Input
            label="Area / size"
            name="area"
            type="number"
            min={0}
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            placeholder="Marla, Kanal, or Sq Ft"
          />
          <div className="sm:col-span-2">
            <Textarea
              label="Description"
              name="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              error={errors.description}
              required
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-semibold text-navy">
          Your contact
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
        </div>
      </section>

      <Button type="submit" variant="gold" size="lg">
        Submit Listing Request
      </Button>
      {success ? <p className="text-sm text-navy-muted">{success}</p> : null}
    </form>
  );
}
