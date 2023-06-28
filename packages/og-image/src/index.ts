/* eslint-disable import/no-default-export */

/* eslint react/no-unknown-property: ['error', { ignore: ['tw'] }] */
import { handler } from './handler';

const hour = 3600;
const day = hour * 24;
const year = 365 * day;

const maxAgeForCDN = year;
const maxAgeForBrowser = hour / 2;

export default {
  async fetch(request: Request, _env: unknown, ctx: ExecutionContext) {
    const cacheUrl = new URL(request.url);

    // In case you want to purge the cache, please bump the version number below:
    cacheUrl.searchParams.set('version', 'v10');

    // Construct the cache key from the cache URL
    const cacheKey = new Request(cacheUrl.toString(), request);
    const cache = caches.default;

    let response = await cache.match(cacheKey);

    if (!response) {
      // If not in cache, get it from origin
      response = await handler(request);

      if (process.env.NODE_ENV !== 'test' && ![404, 500].includes(response.status)) {
        // Any changes made to the response here will be reflected in the cached value
        response.headers.append('Cache-Control', 'public');
        response.headers.append('Cache-Control', `s-maxage=${maxAgeForCDN}`);
        response.headers.append('Cache-Control', `max-age=${maxAgeForBrowser}`);
      }

      // Store the fetched response as cacheKey
      // Use `waitUntil`, so you can return the response without blocking on
      // writing to cache
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
    }
    return response;
  },
};
