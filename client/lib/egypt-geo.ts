export type LngLat = [number, number];

// Simplified outline polygon for Egypt including Sinai (clockwise), [lng, lat]
export const EGYPT_OUTLINE: LngLat[] = [
  [25.0, 31.6], // NW (Sallum)
  [29.9, 31.3], // Alexandria
  [32.3, 31.3], // Port Said
  [34.2, 31.2], // Rafah
  [34.9, 28.0], // Sinai SE
  [36.9, 22.0], // SE border
  [25.0, 22.0], // SW border
];

export const EGYPT_BOUNDS = {
  minLng: 24.7,
  maxLng: 36.9,
  minLat: 22.0,
  maxLat: 31.6,
};

export type GovCentroid = { gov: string; lng: number; lat: number };
export const GOV_CENTROIDS: GovCentroid[] = [
  // المحافظات المتاحة في التطبيق فقط
  { gov: "Alexandria", lng: 29.9, lat: 31.2 },
  { gov: "Cairo", lng: 31.25, lat: 30.05 },
  { gov: "Giza", lng: 30.9, lat: 29.9 },
  { gov: "Luxor", lng: 32.65, lat: 25.7 },
  { gov: "Aswan", lng: 32.9, lat: 24.1 },
  { gov: "South Sinai", lng: 33.8, lat: 28.5 },
  { gov: "Red Sea", lng: 33.5, lat: 26.5 },
  { gov: "New Valley", lng: 27.0, lat: 25.0 },
  { gov: "Fayoum", lng: 30.6, lat: 29.3 },
  { gov: "Suez", lng: 32.5, lat: 30.0 },
];

// Approximate Nile main path from Aswan to Cairo
export const NILE_PATH: LngLat[] = [
  [32.8998, 24.0889], // Aswan
  [32.65, 25.2],
  [32.6396, 25.6872], // Luxor
  [32.0, 26.5],
  [31.5, 27.2], // Asyut approx
  [31.1, 28.1], // Minya approx
  [31.09, 29.07], // Beni Suef approx
  [31.2357, 30.0444], // Cairo
];

// Nile delta branches from Cairo to Alexandria and Port Said
export const NILE_DELTA_LEFT: LngLat[] = [
  [31.2357, 30.0444], // Cairo
  [30.8, 30.6],
  [30.3, 31.0],
  [29.9187, 31.2001], // Alexandria
];
export const NILE_DELTA_RIGHT: LngLat[] = [
  [31.2357, 30.0444], // Cairo
  [31.8, 30.7],
  [32.2, 31.0],
  [32.3, 31.3], // Port Said
];

export function project(lng: number, lat: number, width: number, height: number) {
  const x = ((lng - EGYPT_BOUNDS.minLng) / (EGYPT_BOUNDS.maxLng - EGYPT_BOUNDS.minLng)) * width;
  const y = (1 - (lat - EGYPT_BOUNDS.minLat) / (EGYPT_BOUNDS.maxLat - EGYPT_BOUNDS.minLat)) * height;
  return { x, y };
}

export function outlinePath(width: number, height: number) {
  if (EGYPT_OUTLINE.length === 0) return "";
  const [first, ...rest] = EGYPT_OUTLINE;
  const p0 = project(first[0], first[1], width, height);
  const parts = [`M ${p0.x.toFixed(2)},${p0.y.toFixed(2)}`];
  for (const [lng, lat] of rest) {
    const p = project(lng, lat, width, height);
    parts.push(`L ${p.x.toFixed(2)},${p.y.toFixed(2)}`);
  }
  parts.push("Z");
  return parts.join(" ");
}

export function polylinePath(points: LngLat[], width: number, height: number) {
  if (points.length === 0) return "";
  const [first, ...rest] = points;
  const p0 = project(first[0], first[1], width, height);
  const parts = [`M ${p0.x.toFixed(2)},${p0.y.toFixed(2)}`];
  for (const [lng, lat] of rest) {
    const p = project(lng, lat, width, height);
    parts.push(`L ${p.x.toFixed(2)},${p.y.toFixed(2)}`);
  }
  return parts.join(" ");
}

// Suez Canal approx from Port Said to Suez
export const SUEZ_CANAL: LngLat[] = [
  [32.3, 31.3], // Port Said
  [32.35, 30.8],
  [32.4, 30.3],
  [32.55, 29.97], // Suez
];

// Lake Nasser (approx spine)
export const LAKE_NASSER: LngLat[] = [
  [32.9, 24.1],
  [32.7, 23.6],
  [32.55, 23.2],
  [32.4, 22.7],
  [32.3, 22.3],
];

export type Oasis = { name: string; lng: number; lat: number };
export const OASES: Oasis[] = [
  { name: "Siwa", lng: 25.5, lat: 29.2 },
  { name: "Bahariya", lng: 28.3, lat: 28.3 },
  { name: "Farafra", lng: 27.1, lat: 27.1 },
  { name: "Dakhla", lng: 29.0, lat: 25.5 },
  { name: "Kharga", lng: 30.5, lat: 25.4 },
];
