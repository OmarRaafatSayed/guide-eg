export const STORAGE_KEYS = {
  posts: "nile.posts",
  itinerary: "nile.itinerary",
  profile: "nile.profile",
  mapCity: "nile.mapCity",
} as const;

export function save<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
export function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
