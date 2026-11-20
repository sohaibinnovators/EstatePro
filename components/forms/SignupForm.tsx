"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email.";
    }
    if (!form.password || form.password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }
    if (form.confirm !== form.password) {
      next.confirm = "Passwords do not match.";
    }
    setErrors(next);
    if (Object.keys(next).length) {
      setSuccess("");
      return;
    }
    setSuccess("Account form validated (demo only — no registration).");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
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
        autoComplete="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        error={errors.email}
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        error={errors.password}
        required
      />
      <Input
        label="Confirm password"
        name="confirm"
        type="password"
        autoComplete="new-password"
        value={form.confirm}
        onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        error={errors.confirm}
        required
      />
      <Button type="submit" variant="gold" className="w-full">
        Create Account
      </Button>
      {success ? <p className="text-sm text-navy-muted">{success}</p> : null}
      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-navy underline-offset-4 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
