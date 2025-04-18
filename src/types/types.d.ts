export interface CustomProperties {
  id: number;
  name: string;
  totalFinancingUsd: number;
  financingPerLocation: number;
  endDate: string;
  donors: string[];
  sectors: string[];
  location_name: string;
}

export type ProjectFeature = Feature<Point, CustomProperties>;

export type ProjectFeatureCollection = FeatureCollection<Point, CustomProperties>;

export interface ApiProjectsForMap {
  total: number;
  data: ProjectForMap[];
}

export interface ProjectForMap {
  id: number;
  name: string;
  address: ProjectAddress[] | null;
  startDate: string;
  endDate: string;
  totalSum: string;
  description: string;
  projectResults: string;
  isApproved: boolean;
  isPublished: boolean;
  status: string;
  sectors: Sector[];
  partners: PartnerForMap[];
}

export interface ProjectAddress {
  id: number | null;
  region: Region;
  coordinates: [number, number];
}

export interface Region {
  id: number;
  name: string;
  district: string | null;
  projectCount: number;
}

export interface Sector {
  id: number;
  name: string;
}

export interface PartnerForMap {
  id: number;
  name: string;
  identificationNumber: string | null;
  type: string;
}
