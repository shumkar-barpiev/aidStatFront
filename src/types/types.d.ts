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
