import { LRUCache } from "lru-cache";

type RateLimitEntry = number;

const caches = new Map<number, LRUCache<string, RateLimitEntry>>();
// separate cace for each route
function getCache(windowMs: number) {
  if (!caches.has(windowMs)) {
    caches.set(
      windowMs,
      new LRUCache<string, RateLimitEntry>({
        max: 10_000,
        ttl: windowMs,
      })
    );
  }
  return caches.get(windowMs)!;
}
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  // use as rateLimit(key, ROUTE_LIMITS.SEND_MESSAGE)
  const cache = getCache(windowMs);

  const current = cache.get(key) ?? 0;

  if (current >= limit) {
    return { allowed: false, remaining: 0 };
  }

  cache.set(key, current + 1);

  return {
    allowed: true,
    remaining: limit - (current + 1),
  };
}
