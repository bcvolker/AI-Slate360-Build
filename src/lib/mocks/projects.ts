export type MockProject = {
  id: string;
  name: string;
  client: string;
  organization: string;
  region: string;
  status: "planning" | "active" | "completed";
  phase: string;
  lastUpdated: string;
};

export const mockProjects: MockProject[] = [
  {
    id: "p-small-1",
    name: "Lakeside Remodel",
    client: "Harborview Homes",
    organization: "Blue Ridge Builders",
    region: "PNW",
    status: "active",
    phase: "Framing & Rough-In",
    lastUpdated: "2025-11-20",
  },
  {
    id: "p-small-2",
    name: "Downtown Loft Conversion",
    client: "UrbanCore Living",
    organization: "Cityline Construction Co.",
    region: "Midwest",
    status: "planning",
    phase: "Preconstruction & Design",
    lastUpdated: "2025-11-18",
  },
  {
    id: "p-enterprise-1",
    name: "Metro Light Rail Segment B",
    client: "Metro Transit Authority",
    organization: "Northstar Infrastructure Group",
    region: "Northeast",
    status: "active",
    phase: "Systems & Finishes",
    lastUpdated: "2025-11-22",
  },
  {
    id: "p-enterprise-2",
    name: "Regional Hospital Expansion",
    client: "St. Anne Health System",
    organization: "Northstar Infrastructure Group",
    region: "Northeast",
    status: "active",
    phase: "Shell & Core",
    lastUpdated: "2025-11-19",
  },
];
