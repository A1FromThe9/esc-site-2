import data from "@/data/profiles.json";

export function getAllProviders() {
  return data.providers;
}

export function getProviderById(id) {
  return data.providers.find((p) => p.id === id) || null;
}

export function getFeaturedProviders(limit = 4) {
  return data.providers.filter((p) => p.featured).slice(0, limit);
}
