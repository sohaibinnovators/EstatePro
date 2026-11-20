import type { Property } from "../types";
import { getAgentById } from "./agents";

/**
 * Demonstration property inventory for EstatePro Phase 2.
 * All listings are sample data for Pakistan markets (Lahore, Karachi, Islamabad).
 */
export const properties: Property[] = [
  {
    id: "pk1",
    slug: "dha-lahore-phase-6-10-marla-house",
    title: "10 Marla Designer House — DHA Phase 6",
    description:
      "A beautifully finished 10 Marla residence in DHA Lahore Phase 6 featuring a modern open kitchen, dual lounge setup, tiled bathrooms, and a private lawn. Ideal for families seeking premium sector living with nearby schools and parks. Demonstration listing.",
    price: 65000000,
    status: "sale",
    type: "house",
    featured: true,
    bedrooms: 5,
    bathrooms: 6,
    area: 10,
    areaUnit: "marla",
    yearBuilt: 2021,
    parking: 2,
    address: "House 42, Street 8, Phase 6",
    city: "Lahore",
    areaName: "DHA Lahore",
    location: "DHA Phase 6, Lahore",
    coordinates: { lat: 31.4697, lng: 74.408 },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop",
    ],
    amenities: ["Lawn", "Servant Quarter", "Solar Ready", "CCTV", "Drawing Room"],
    features: ["Corner proximity", "Tile flooring", "Modular kitchen", "Terrace"],
    agentId: "a1",
    listedDate: "2026-11-08",
  },
  {
    id: "pk2",
    slug: "bahria-town-lahore-sector-c-1-kanal-villa",
    title: "1 Kanal Villa — Bahria Town Sector C",
    description:
      "Spacious 1 Kanal villa with landscaped front and rear gardens, a formal drawing room, and a fully equipped kitchen. Quiet residential pocket of Bahria Town Lahore with club and commercial access. Demonstration listing.",
    price: 95000000,
    status: "sale",
    type: "house",
    featured: true,
    bedrooms: 6,
    bathrooms: 7,
    area: 1,
    areaUnit: "kanal",
    yearBuilt: 2019,
    parking: 3,
    address: "Villa 17, Sector C",
    city: "Lahore",
    areaName: "Bahria Town Lahore",
    location: "Bahria Town Sector C, Lahore",
    coordinates: { lat: 31.367, lng: 74.185 },
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cd8?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop",
    ],
    amenities: ["Garden", "Home Theatre Ready", "Generator", "Store Room", "Powder Room"],
    features: ["Double height foyer", "Imported fittings", "Wide car porch"],
    agentId: "a2",
    listedDate: "2026-10-22",
  },
  {
    id: "pk3",
    slug: "gulberg-lahore-mm-alam-apartment-rent",
    title: "Furnished Apartment near MM Alam — Gulberg",
    description:
      "Bright 3-bed apartment steps from MM Alam Road dining and shopping. Includes covered parking, backup power, and a modern kitchen. Perfect for professionals relocating to Gulberg Lahore. Demonstration listing.",
    price: 220000,
    status: "rent",
    type: "apartment",
    featured: true,
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    areaUnit: "sqft",
    yearBuilt: 2018,
    parking: 1,
    address: "Apt 5B, Block C2",
    city: "Lahore",
    areaName: "Gulberg Lahore",
    location: "Gulberg III, Lahore",
    coordinates: { lat: 31.5102, lng: 74.3441 },
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
    ],
    amenities: ["Lift", "Backup Power", "Covered Parking", "Security", "Balcony"],
    features: ["Semi-furnished", "Open plan lounge", "Near cafes"],
    agentId: "a4",
    listedDate: "2026-11-12",
  },
  {
    id: "pk4",
    slug: "dha-lahore-phase-5-5-marla-house-rent",
    title: "5 Marla Family House — DHA Phase 5",
    description:
      "Well-maintained 5 Marla house available for rent in DHA Lahore Phase 5. Three bedrooms, two baths upstairs, and a compact lawn. Quiet street with easy access to commercial boulevard. Demonstration listing.",
    price: 175000,
    status: "rent",
    type: "house",
    featured: false,
    bedrooms: 3,
    bathrooms: 3,
    area: 5,
    areaUnit: "marla",
    yearBuilt: 2016,
    parking: 1,
    address: "House 109, Street 21, Phase 5",
    city: "Lahore",
    areaName: "DHA Lahore",
    location: "DHA Phase 5, Lahore",
    coordinates: { lat: 31.482, lng: 74.402 },
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop",
    ],
    amenities: ["Lawn", "Kitchen", "Store", "Gas", "Water Boring"],
    features: ["Family-friendly street", "Painted interiors", "Tile work"],
    agentId: "a4",
    listedDate: "2026-11-01",
  },
  {
    id: "pk5",
    slug: "bahria-town-lahore-sector-bb-plot-10-marla",
    title: "10 Marla Residential Plot — Bahria Town",
    description:
      "Level 10 Marla residential plot in a developed sector of Bahria Town Lahore. Ideal for custom home construction with road access and nearby utilities. Demonstration listing.",
    price: 28000000,
    status: "sale",
    type: "plot",
    featured: false,
    bedrooms: 0,
    bathrooms: 0,
    area: 10,
    areaUnit: "marla",
    yearBuilt: 0,
    parking: 0,
    address: "Plot 88, Sector BB",
    city: "Lahore",
    areaName: "Bahria Town Lahore",
    location: "Bahria Town Sector BB, Lahore",
    coordinates: { lat: 31.355, lng: 74.2 },
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop",
    ],
    amenities: ["Road Access", "Utilities Nearby", "Residential Zone"],
    features: ["Clear title demo data", "Level ground", "Corner-adjacent"],
    agentId: "a3",
    listedDate: "2026-09-18",
  },
  {
    id: "pk6",
    slug: "gulberg-lahore-commercial-shop-mm-alam",
    title: "Ground Floor Shop — Gulberg Commercial",
    description:
      "Prime ground-floor commercial unit near MM Alam Road with strong footfall potential for retail or café concepts. Demonstration listing for EstatePro inventory.",
    price: 42000000,
    status: "sale",
    type: "commercial",
    featured: true,
    bedrooms: 0,
    bathrooms: 1,
    area: 1200,
    areaUnit: "sqft",
    yearBuilt: 2014,
    parking: 0,
    address: "Shop 12, Main Boulevard Extension",
    city: "Lahore",
    areaName: "Gulberg Lahore",
    location: "Gulberg Main Boulevard, Lahore",
    coordinates: { lat: 31.5205, lng: 74.3505 },
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&h=800&fit=crop",
    ],
    amenities: ["Frontage", "Shutters", "Washroom", "Storage Mezzanine"],
    features: ["High visibility", "Flexible fit-out", "Busy corridor"],
    agentId: "a3",
    listedDate: "2026-10-05",
  },
  {
    id: "pk7",
    slug: "dha-karachi-phase-8-1-kanal-house",
    title: "1 Kanal Contemporary House — DHA Phase 8",
    description:
      "Contemporary 1 Kanal home in DHA Karachi Phase 8 with sea-breeze exposure, wide living spaces, and premium finishes throughout. Demonstration listing.",
    price: 185000000,
    status: "sale",
    type: "house",
    featured: true,
    bedrooms: 6,
    bathrooms: 7,
    area: 1,
    areaUnit: "kanal",
    yearBuilt: 2022,
    parking: 3,
    address: "House 7, Street 15, Phase 8",
    city: "Karachi",
    areaName: "DHA Karachi",
    location: "DHA Phase 8, Karachi",
    coordinates: { lat: 24.805, lng: 67.065 },
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop",
    ],
    amenities: ["Smart Lighting", "Servant Wing", "Rooftop Terrace", "CCTV", "Lawn"],
    features: ["Open plan living", "Imported kitchen", "Wide car porch"],
    agentId: "a1",
    listedDate: "2026-10-30",
  },
  {
    id: "pk8",
    slug: "clifton-karachi-block-2-apartment-sale",
    title: "Sea-View Apartment — Clifton Block 2",
    description:
      "Elegant apartment in Clifton Karachi with partial sea views, marble flooring, and building amenities including generator and 24/7 security. Demonstration listing.",
    price: 48000000,
    status: "sale",
    type: "apartment",
    featured: true,
    bedrooms: 3,
    bathrooms: 3,
    area: 2100,
    areaUnit: "sqft",
    yearBuilt: 2017,
    parking: 2,
    address: "Apt 1204, Block 2 Clifton",
    city: "Karachi",
    areaName: "Clifton Karachi",
    location: "Clifton Block 2, Karachi",
    coordinates: { lat: 24.8138, lng: 67.0225 },
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1502672023488-70e4597461d4?w=1200&h=800&fit=crop",
    ],
    amenities: ["Generator", "Lift", "Security", "Balcony", "Reserved Parking"],
    features: ["Sea-facing orientation", "Marble floors", "Built-in wardrobes"],
    agentId: "a5",
    listedDate: "2026-11-05",
  },
  {
    id: "pk9",
    slug: "bahria-town-karachi-precinct-11-house-rent",
    title: "5 Marla House for Rent — Bahria Town",
    description:
      "Comfortable family house in Bahria Town Karachi Precinct 11 with three bedrooms, lawn, and community park access. Demonstration listing.",
    price: 95000,
    status: "rent",
    type: "house",
    featured: false,
    bedrooms: 3,
    bathrooms: 3,
    area: 5,
    areaUnit: "marla",
    yearBuilt: 2020,
    parking: 1,
    address: "House 33, Precinct 11",
    city: "Karachi",
    areaName: "Bahria Town Karachi",
    location: "Bahria Town Precinct 11, Karachi",
    coordinates: { lat: 25.01, lng: 67.31 },
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600121848594-d8642e9f4c2a?w=1200&h=800&fit=crop",
    ],
    amenities: ["Lawn", "Kitchen", "Community Park", "Security Gate"],
    features: ["Fresh paint", "Family layout", "Near mosque"],
    agentId: "a4",
    listedDate: "2026-11-09",
  },
  {
    id: "pk10",
    slug: "dha-karachi-phase-6-commercial-office",
    title: "Office Suite — DHA Phase 6 Commercial",
    description:
      "Ready-to-use office suite in DHA Karachi Phase 6 commercial belt. Open work area plus two cabins, suitable for consultancy or boutique brands. Demonstration listing.",
    price: 350000,
    status: "rent",
    type: "commercial",
    featured: false,
    bedrooms: 0,
    bathrooms: 2,
    area: 1800,
    areaUnit: "sqft",
    yearBuilt: 2015,
    parking: 2,
    address: "Suite 3, Khayaban-e-Shaheen Extension",
    city: "Karachi",
    areaName: "DHA Karachi",
    location: "DHA Phase 6 Commercial, Karachi",
    coordinates: { lat: 24.812, lng: 67.055 },
    images: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&h=800&fit=crop",
    ],
    amenities: ["Reception Area", "Washrooms", "AC Ready", "Parking"],
    features: ["Two private cabins", "Open desk zone", "Glass partition ready"],
    agentId: "a3",
    listedDate: "2026-10-12",
  },
  {
    id: "pk11",
    slug: "clifton-karachi-block-5-plot",
    title: "Residential Plot — Clifton Block 5",
    description:
      "Rare residential plot opportunity in Clifton Karachi Block 5 for a custom luxury home. Demonstration listing with sample pricing.",
    price: 220000000,
    status: "sale",
    type: "plot",
    featured: true,
    bedrooms: 0,
    bathrooms: 0,
    area: 1,
    areaUnit: "kanal",
    yearBuilt: 0,
    parking: 0,
    address: "Plot 19, Block 5",
    city: "Karachi",
    areaName: "Clifton Karachi",
    location: "Clifton Block 5, Karachi",
    coordinates: { lat: 24.821, lng: 67.03 },
    images: [
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop",
    ],
    amenities: ["Prime Location", "Road Access", "Residential Zoning"],
    features: ["High demand pocket", "Custom build potential"],
    agentId: "a5",
    listedDate: "2026-09-28",
  },
  {
    id: "pk12",
    slug: "f7-islamabad-markaz-apartment-rent",
    title: "2-Bed Apartment near F-7 Markaz",
    description:
      "Stylish apartment walking distance from F-7 Markaz Islamabad. Includes balcony, backup power, and secure building access. Demonstration listing.",
    price: 160000,
    status: "rent",
    type: "apartment",
    featured: true,
    bedrooms: 2,
    bathrooms: 2,
    area: 1250,
    areaUnit: "sqft",
    yearBuilt: 2019,
    parking: 1,
    address: "Apt 8, Street 42, F-7/1",
    city: "Islamabad",
    areaName: "F-7 Islamabad",
    location: "F-7/1, Islamabad",
    coordinates: { lat: 33.721, lng: 73.057 },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57bb?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200&h=800&fit=crop",
    ],
    amenities: ["Balcony", "Lift", "Backup", "Security", "Parking"],
    features: ["Near Markaz", "Natural light", "Modern kitchen"],
    agentId: "a6",
    listedDate: "2026-11-11",
  },
  {
    id: "pk13",
    slug: "dha-islamabad-phase-2-10-marla-house",
    title: "10 Marla Modern House — DHA Phase 2",
    description:
      "Elegant 10 Marla house in DHA Islamabad Phase 2 with landscaped lawn, drawing and dining separation, and high-quality woodwork. Demonstration listing.",
    price: 78000000,
    status: "sale",
    type: "house",
    featured: true,
    bedrooms: 5,
    bathrooms: 5,
    area: 10,
    areaUnit: "marla",
    yearBuilt: 2020,
    parking: 2,
    address: "House 21, Street 9, Phase 2",
    city: "Islamabad",
    areaName: "DHA Islamabad",
    location: "DHA Phase 2, Islamabad",
    coordinates: { lat: 33.54, lng: 73.12 },
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&h=800&fit=crop",
    ],
    amenities: ["Lawn", "Drawing Room", "Servant Room", "Solar", "Store"],
    features: ["Solid woodwork", "Tile baths", "Wide porch"],
    agentId: "a2",
    listedDate: "2026-10-18",
  },
  {
    id: "pk14",
    slug: "bahria-town-islamabad-phase-7-apartment",
    title: "Family Apartment — Bahria Town Phase 7",
    description:
      "Affordable family apartment in Bahria Town Islamabad Phase 7 with community amenities and easy motorway access. Demonstration listing.",
    price: 18500000,
    status: "sale",
    type: "apartment",
    featured: false,
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    areaUnit: "sqft",
    yearBuilt: 2021,
    parking: 1,
    address: "Apt 3C, Safari Valley Extension",
    city: "Islamabad",
    areaName: "Bahria Town Islamabad",
    location: "Bahria Town Phase 7, Islamabad",
    coordinates: { lat: 33.49, lng: 73.1 },
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1556020685-ae41c78ed09a?w=1200&h=800&fit=crop",
    ],
    amenities: ["Community Park", "Security", "Parking", "Backup"],
    features: ["Family layout", "Open kitchen", "Balcony"],
    agentId: "a6",
    listedDate: "2026-09-10",
  },
  {
    id: "pk15",
    slug: "f7-islamabad-street-house-sale",
    title: "Renovated Street House — F-7",
    description:
      "Classic Islamabad street house in F-7, renovated with modern bathrooms and an updated kitchen while retaining generous room sizes. Demonstration listing.",
    price: 145000000,
    status: "sale",
    type: "house",
    featured: false,
    bedrooms: 4,
    bathrooms: 4,
    area: 1,
    areaUnit: "kanal",
    yearBuilt: 1998,
    parking: 2,
    address: "House 14, Street 28, F-7/2",
    city: "Islamabad",
    areaName: "F-7 Islamabad",
    location: "F-7/2, Islamabad",
    coordinates: { lat: 33.718, lng: 73.055 },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&h=800&fit=crop",
    ],
    amenities: ["Lawn", "Garage", "Store", "Servant Quarter"],
    features: ["Renovated baths", "Central location", "Mature trees"],
    agentId: "a1",
    listedDate: "2026-08-25",
  },
  {
    id: "pk16",
    slug: "dha-islamabad-phase-1-plot-5-marla",
    title: "5 Marla Plot — DHA Islamabad Phase 1",
    description:
      "Developed-sector 5 Marla plot in DHA Islamabad Phase 1 suitable for a compact modern home. Demonstration listing.",
    price: 22000000,
    status: "sale",
    type: "plot",
    featured: false,
    bedrooms: 0,
    bathrooms: 0,
    area: 5,
    areaUnit: "marla",
    yearBuilt: 0,
    parking: 0,
    address: "Plot 56, Street 4, Phase 1",
    city: "Islamabad",
    areaName: "DHA Islamabad",
    location: "DHA Phase 1, Islamabad",
    coordinates: { lat: 33.53, lng: 73.11 },
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop",
    ],
    amenities: ["Road Access", "Utilities", "Residential Zone"],
    features: ["Compact footprint", "Build-ready demo data"],
    agentId: "a3",
    listedDate: "2026-10-02",
  },
  {
    id: "pk17",
    slug: "bahria-town-islamabad-phase-4-house-rent",
    title: "10 Marla House for Rent — Bahria Phase 4",
    description:
      "Spacious rental home in Bahria Town Islamabad Phase 4 with five bedrooms and a private lawn. Suitable for large families. Demonstration listing.",
    price: 210000,
    status: "rent",
    type: "house",
    featured: false,
    bedrooms: 5,
    bathrooms: 5,
    area: 10,
    areaUnit: "marla",
    yearBuilt: 2018,
    parking: 2,
    address: "House 9, Street 12, Phase 4",
    city: "Islamabad",
    areaName: "Bahria Town Islamabad",
    location: "Bahria Town Phase 4, Islamabad",
    coordinates: { lat: 33.5, lng: 73.09 },
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=800&fit=crop",
    ],
    amenities: ["Lawn", "Drawing Room", "Store", "Backup"],
    features: ["Family sized", "Quiet street", "Near school routes"],
    agentId: "a2",
    listedDate: "2026-11-03",
  },
  {
    id: "pk18",
    slug: "dha-lahore-phase-4-commercial-plaza-unit",
    title: "Plaza Unit — DHA Phase 4 Commercial",
    description:
      "First-floor commercial plaza unit in DHA Lahore Phase 4 suitable for clinics, boutiques, or offices. Demonstration listing.",
    price: 27500000,
    status: "sale",
    type: "commercial",
    featured: false,
    bedrooms: 0,
    bathrooms: 1,
    area: 900,
    areaUnit: "sqft",
    yearBuilt: 2016,
    parking: 1,
    address: "Unit 204, Plaza 7, Phase 4",
    city: "Lahore",
    areaName: "DHA Lahore",
    location: "DHA Phase 4 Commercial, Lahore",
    coordinates: { lat: 31.475, lng: 74.39 },
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&h=800&fit=crop",
    ],
    amenities: ["Lift Access", "Washroom", "Parking Share", "Glass Front"],
    features: ["Flexible layout", "Busy plaza", "Fit-out ready"],
    agentId: "a3",
    listedDate: "2026-09-05",
  },
  {
    id: "pk19",
    slug: "gulberg-lahore-2-bed-apartment-sale",
    title: "2-Bed Apartment — Gulberg Residences",
    description:
      "Compact investment apartment in Gulberg Lahore with balcony views over a quiet lane. Demonstration listing.",
    price: 23500000,
    status: "sale",
    type: "apartment",
    featured: false,
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    areaUnit: "sqft",
    yearBuilt: 2015,
    parking: 1,
    address: "Apt 2A, Street 15",
    city: "Lahore",
    areaName: "Gulberg Lahore",
    location: "Gulberg II, Lahore",
    coordinates: { lat: 31.507, lng: 74.346 },
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
    ],
    amenities: ["Balcony", "Parking", "Security", "Backup"],
    features: ["Investment friendly", "Low maintenance", "Central Gulberg"],
    agentId: "a6",
    listedDate: "2026-08-14",
  },
  {
    id: "pk20",
    slug: "bahria-town-karachi-precinct-2-plot",
    title: "3 Marla Plot — Bahria Town Karachi",
    description:
      "Affordable residential plot in Bahria Town Karachi Precinct 2 for first-time builders. Demonstration listing.",
    price: 9500000,
    status: "sale",
    type: "plot",
    featured: false,
    bedrooms: 0,
    bathrooms: 0,
    area: 3,
    areaUnit: "marla",
    yearBuilt: 0,
    parking: 0,
    address: "Plot 210, Precinct 2",
    city: "Karachi",
    areaName: "Bahria Town Karachi",
    location: "Bahria Town Precinct 2, Karachi",
    coordinates: { lat: 25.0, lng: 67.3 },
    images: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=800&fit=crop",
    ],
    amenities: ["Road Access", "Community Development", "Utilities Planned"],
    features: ["Entry-level plot", "Growing precinct"],
    agentId: "a5",
    listedDate: "2026-10-08",
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}

export function getRecentProperties(limit = 4): Property[] {
  return [...properties]
    .sort(
      (a, b) =>
        new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime(),
    )
    .slice(0, limit);
}

export function getPropertiesByStatus(status: "sale" | "rent"): Property[] {
  return properties.filter((p) => p.status === status);
}

export function getPropertiesByAgent(agentId: string): Property[] {
  return properties.filter((p) => p.agentId === agentId);
}

export function getSimilarProperties(
  property: Property,
  limit = 3,
): Property[] {
  return properties
    .filter((p) => p.id !== property.id)
    .map((p) => {
      let score = 0;
      if (p.areaName === property.areaName) score += 5;
      if (p.city === property.city) score += 4;
      if (p.type === property.type) score += 3;
      if (p.status === property.status) score += 1;
      return { p, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}

export function getPropertiesByIds(ids: string[]): Property[] {
  const map = new Map(properties.map((p) => [p.id, p]));
  return ids
    .map((id) => map.get(id))
    .filter((p): p is Property => Boolean(p));
}

export function getAgentListingCount(agentId: string): number {
  return properties.filter((p) => p.agentId === agentId).length;
}

export function getPropertyAgent(property: Property) {
  return getAgentById(property.agentId);
}

export const propertyTypes = [
  {
    type: "house" as const,
    label: "Houses",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
  },
  {
    type: "apartment" as const,
    label: "Apartments",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
  },
  {
    type: "plot" as const,
    label: "Plots",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
  },
  {
    type: "commercial" as const,
    label: "Commercial",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
  },
];

export const featuredLocations = [
  {
    label: "DHA Lahore",
    city: "Lahore",
    area: "DHA Lahore",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=700&fit=crop",
    count: properties.filter((p) => p.areaName === "DHA Lahore").length,
  },
  {
    label: "Bahria Town Lahore",
    city: "Lahore",
    area: "Bahria Town Lahore",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&h=700&fit=crop",
    count: properties.filter((p) => p.areaName === "Bahria Town Lahore").length,
  },
  {
    label: "Gulberg Lahore",
    city: "Lahore",
    area: "Gulberg Lahore",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=700&fit=crop",
    count: properties.filter((p) => p.areaName === "Gulberg Lahore").length,
  },
  {
    label: "DHA Karachi",
    city: "Karachi",
    area: "DHA Karachi",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&h=700&fit=crop",
    count: properties.filter((p) => p.areaName === "DHA Karachi").length,
  },
  {
    label: "Clifton Karachi",
    city: "Karachi",
    area: "Clifton Karachi",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&h=700&fit=crop",
    count: properties.filter((p) => p.areaName === "Clifton Karachi").length,
  },
  {
    label: "Bahria Town Karachi",
    city: "Karachi",
    area: "Bahria Town Karachi",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&h=700&fit=crop",
    count: properties.filter((p) => p.areaName === "Bahria Town Karachi")
      .length,
  },
  {
    label: "F-7 Islamabad",
    city: "Islamabad",
    area: "F-7 Islamabad",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&h=700&fit=crop",
    count: properties.filter((p) => p.areaName === "F-7 Islamabad").length,
  },
  {
    label: "DHA Islamabad",
    city: "Islamabad",
    area: "DHA Islamabad",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&h=700&fit=crop",
    count: properties.filter((p) => p.areaName === "DHA Islamabad").length,
  },
  {
    label: "Bahria Town Islamabad",
    city: "Islamabad",
    area: "Bahria Town Islamabad",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&h=700&fit=crop",
    count: properties.filter((p) => p.areaName === "Bahria Town Islamabad")
      .length,
  },
];
