import type { InquiryRecord, InquiryStatus } from "./types";
import { readStorageJson, writeStorageJson } from "./storage";

export const INQUIRIES_KEY = "estatepro:inquiries";
export const INQUIRIES_EVENT = "estatepro:inquiries-change";

function createId(): string {
  return `inq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function emit(list: InquiryRecord[]) {
  writeStorageJson(INQUIRIES_KEY, list);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(INQUIRIES_EVENT, { detail: list }));
  }
  return list;
}

function normalize(item: unknown): InquiryRecord | null {
  if (!item || typeof item !== "object") return null;
  const raw = item as Partial<InquiryRecord>;
  if (typeof raw.id !== "string" || raw.demo !== true) return null;
  if (typeof raw.name !== "string" || typeof raw.email !== "string") return null;
  const status: InquiryStatus =
    raw.status === "reviewed" || raw.status === "closed" || raw.status === "new"
      ? raw.status
      : "new";
  return {
    id: raw.id,
    type: raw.type === "agent" ? "agent" : "property",
    createdAt:
      typeof raw.createdAt === "string"
        ? raw.createdAt
        : new Date().toISOString(),
    name: raw.name,
    email: raw.email,
    phone: raw.phone,
    message: typeof raw.message === "string" ? raw.message : "",
    agentId: raw.agentId,
    agentName: raw.agentName,
    propertyId: raw.propertyId,
    propertySlug: raw.propertySlug,
    propertyTitle: raw.propertyTitle,
    propertyRef: raw.propertyRef,
    status,
    demo: true,
  };
}

export function getInquiries(): InquiryRecord[] {
  const data = readStorageJson<unknown>(INQUIRIES_KEY, []);
  if (!Array.isArray(data)) return [];
  return data.map(normalize).filter((x): x is InquiryRecord => Boolean(x));
}

export function setInquiries(list: InquiryRecord[]): InquiryRecord[] {
  return emit(list.map(normalize).filter((x): x is InquiryRecord => Boolean(x)));
}

export function saveInquiry(
  input: Omit<InquiryRecord, "id" | "createdAt" | "demo" | "status"> & {
    status?: InquiryStatus;
  },
): InquiryRecord {
  const record: InquiryRecord = {
    ...input,
    id: createId(),
    createdAt: new Date().toISOString(),
    status: input.status ?? "new",
    demo: true,
  };
  emit([record, ...getInquiries()].slice(0, 50));
  return record;
}

export function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
): InquiryRecord | undefined {
  const list = getInquiries();
  const idx = list.findIndex((i) => i.id === id);
  if (idx === -1) return undefined;
  const next = { ...list[idx], status };
  const copy = [...list];
  copy[idx] = next;
  emit(copy);
  return next;
}

export function deleteInquiry(id: string): boolean {
  const list = getInquiries();
  const next = list.filter((i) => i.id !== id);
  if (next.length === list.length) return false;
  emit(next);
  return true;
}
