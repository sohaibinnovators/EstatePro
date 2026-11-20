import type { Agent } from "../types";

/**
 * Demonstration agent profiles for EstatePro Phase 3.
 * Linked to properties via `property.agentId` — do not duplicate agent blobs on listings.
 */
export const agents: Agent[] = [
  {
    id: "a1",
    slug: "ahmed-malik",
    name: "Ahmed Malik",
    position: "Senior Luxury Specialist",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=750&fit=crop",
    email: "ahmed.malik@estatepro.com",
    phone: "+92 300 555 0142",
    experience: "12 years",
    bio: "Ahmed focuses on premium residences across DHA Lahore and DHA Islamabad. Clients value his market fluency, discreet negotiation style, and deep relationships with local developers. Demonstration profile.",
    specialties: ["Luxury Homes", "DHA Markets", "New Construction"],
    languages: ["English", "Urdu"],
    serviceAreas: ["Lahore", "Islamabad", "DHA Lahore", "DHA Islamabad"],
  },
  {
    id: "a2",
    slug: "sara-hussain",
    name: "Sara Hussain",
    position: "Residential Sales Director",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=750&fit=crop",
    email: "sara.hussain@estatepro.com",
    phone: "+92 321 555 0198",
    experience: "9 years",
    bio: "Sara helps families find homes that fit their lifestyle — from Bahria Town communities to established Islamabad sectors. She is known for clear guidance and a calm, client-first process. Demonstration profile.",
    specialties: ["Family Homes", "First-Time Buyers", "Bahria Town"],
    languages: ["English", "Urdu"],
    serviceAreas: ["Lahore", "Islamabad", "Bahria Town Lahore", "Bahria Town Islamabad"],
  },
  {
    id: "a3",
    slug: "bilal-khan",
    name: "Bilal Khan",
    position: "Commercial & Investment Advisor",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=750&fit=crop",
    email: "bilal.khan@estatepro.com",
    phone: "+92 333 555 0174",
    experience: "15 years",
    bio: "Bilal advises investors and owner-occupiers on commercial units, plots, and high-yield residential opportunities across Lahore and Karachi. Demonstration profile.",
    specialties: ["Investment", "Commercial", "Plots"],
    languages: ["English", "Urdu"],
    serviceAreas: ["Lahore", "Karachi", "Gulberg Lahore", "DHA Karachi"],
  },
  {
    id: "a4",
    slug: "aisha-rehman",
    name: "Aisha Rehman",
    position: "Rental Market Specialist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=750&fit=crop",
    email: "aisha.rehman@estatepro.com",
    phone: "+92 345 555 0133",
    experience: "7 years",
    bio: "Aisha connects renters with thoughtfully designed apartments and houses across Gulberg, DHA, and Bahria communities. She focuses on neighborhood fit and lease clarity. Demonstration profile.",
    specialties: ["Rentals", "Apartments", "Lease Advisory"],
    languages: ["English", "Urdu"],
    serviceAreas: ["Lahore", "Karachi", "Gulberg Lahore", "Bahria Town Karachi"],
  },
  {
    id: "a5",
    slug: "omar-farooq",
    name: "Omar Farooq",
    position: "Coastal & Clifton Advisor",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=750&fit=crop",
    email: "omar.farooq@estatepro.com",
    phone: "+92 312 555 0167",
    experience: "11 years",
    bio: "Omar guides buyers through Clifton and DHA Karachi properties with a focus on lifestyle, privacy, and long-term value. Demonstration profile.",
    specialties: ["Clifton", "DHA Karachi", "Sea-View Homes"],
    languages: ["English", "Urdu"],
    serviceAreas: ["Karachi", "Clifton Karachi", "DHA Karachi", "Bahria Town Karachi"],
  },
  {
    id: "a6",
    slug: "fatima-zaidi",
    name: "Fatima Zaidi",
    position: "Islamabad Neighborhood Expert",
    image:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&h=750&fit=crop",
    email: "fatima.zaidi@estatepro.com",
    phone: "+92 301 555 0181",
    experience: "8 years",
    bio: "Fatima brings local insight to F-7, DHA Islamabad, and Bahria Town searches — schools, sectors, and community character. Demonstration profile.",
    specialties: ["F-7 / F Sectors", "Apartments", "Urban Buyers"],
    languages: ["English", "Urdu"],
    serviceAreas: ["Islamabad", "F-7 Islamabad", "DHA Islamabad", "Bahria Town Islamabad"],
  },
];

export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

export function filterAgents(
  list: Agent[],
  {
    query = "",
    city = "",
    specialty = "",
  }: { query?: string; city?: string; specialty?: string },
  listingCounts: Record<string, number> = {},
): Agent[] {
  const q = query.trim().toLowerCase();
  return list.filter((agent) => {
    const matchesQuery =
      !q ||
      agent.name.toLowerCase().includes(q) ||
      agent.position.toLowerCase().includes(q) ||
      agent.specialties.some((s) => s.toLowerCase().includes(q)) ||
      agent.serviceAreas.some((s) => s.toLowerCase().includes(q));

    const matchesCity =
      !city ||
      agent.serviceAreas.some(
        (s) => s.toLowerCase() === city.toLowerCase(),
      );

    const matchesSpecialty =
      !specialty ||
      agent.specialties.some(
        (s) => s.toLowerCase() === specialty.toLowerCase(),
      );

    // Keep agents even with 0 listings for demo completeness
    void listingCounts;
    return matchesQuery && matchesCity && matchesSpecialty;
  });
}
