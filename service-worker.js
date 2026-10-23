const CACHE = "akd-armonica-v51";
const FILES = ["./", "./index.html", "./manifest.webmanifest"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key.startsWith("akd-armonica-") && key !== CACHE)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  const isPage = request.mode === "navigate" ||
    new URL(request.url).pathname.endsWith("/index.html") ||
    new URL(request.url).pathname.endsWith("/");

  event.respondWith(
    caches.open(CACHE).then(async cache => {
      if (isPage) {
        try {
          const response = await fetch(request, { cache: "no-store" });
          if (response && response.ok) {
            cache.put(request, response.clone()).catch(() => {});
            const indexUrl = new URL("./index.html", self.registration.scope).href;
            cache.put(indexUrl, response.clone()).catch(() => {});
          }
          return response;
        } catch (error) {
          return (await cache.match(request)) ||
            (await cache.match("./index.html")) ||
            Response.error();
        }
      }

      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response && response.ok) cache.put(request, response.clone()).catch(() => {});
        return response;
      } catch (error) {
        return (await cache.match("./index.html")) || Response.error();
      }
    })
  );
});
