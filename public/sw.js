const CACHE_VERSION = "daily-wordle-v1";
const APP_SHELL_CACHE = `${CACHE_VERSION}:app-shell`;
const STATIC_CACHE = `${CACHE_VERSION}:static`;
const CACHE_NAMES = new Set([APP_SHELL_CACHE, STATIC_CACHE]);

const REQUIRED_APP_SHELL_URLS = ["/", "/offline", "/manifest.webmanifest"];

const OPTIONAL_APP_SHELL_URLS = [
  "/favicon.ico",
  "/file.svg",
  "/globe.svg",
  "/next.svg",
  "/vercel.svg",
  "/window.svg",
];

const APP_SHELL_URLS = new Set([
  ...REQUIRED_APP_SHELL_URLS,
  ...OPTIONAL_APP_SHELL_URLS,
]);

const REQUIRED_CACHE_REQUESTS = REQUIRED_APP_SHELL_URLS.map(
  (url) => new Request(url, { cache: "reload" }),
);

const OPTIONAL_CACHE_REQUESTS = OPTIONAL_APP_SHELL_URLS.map(
  (url) => new Request(url, { cache: "reload" }),
);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(APP_SHELL_CACHE)
      .then(async (cache) => {
        await cache.addAll(REQUIRED_CACHE_REQUESTS);
        await Promise.allSettled(
          OPTIONAL_CACHE_REQUESTS.map((request) => cache.add(request)),
        );
      })
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (
              CACHE_NAMES.has(cacheName) ||
              !cacheName.startsWith("daily-wordle-")
            ) {
              return Promise.resolve(false);
            }

            return caches.delete(cacheName);
          }),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(request));
    return;
  }

  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  if (APP_SHELL_URLS.has(url.pathname)) {
    event.respondWith(networkFirst(request, APP_SHELL_CACHE));
  }
});

self.addEventListener("message", (event) => {
  if (event.data?.type !== "CACHE_STATIC_URLS") {
    return;
  }

  const urls = Array.isArray(event.data.urls) ? event.data.urls : [];
  const staticUrls = urls.filter((url) => {
    try {
      const resourceUrl = new URL(url);

      return (
        resourceUrl.origin === self.location.origin &&
        resourceUrl.pathname.startsWith("/_next/static/")
      );
    } catch {
      return false;
    }
  });

  if (staticUrls.length === 0) {
    return;
  }

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) =>
        Promise.allSettled(
          staticUrls.map((url) =>
            cache.add(new Request(url, { cache: "reload" })),
          ),
        ),
      ),
  );
});

async function handleNavigation(request) {
  const url = new URL(request.url);

  try {
    const response = await fetch(request);
    const cache = await caches.open(APP_SHELL_CACHE);

    if (url.pathname === "/" && response.ok) {
      await cache.put("/", response.clone());
    }

    return response;
  } catch {
    const cache = await caches.open(APP_SHELL_CACHE);

    if (url.pathname === "/") {
      const cachedHome = await cache.match("/");

      if (cachedHome) {
        return cachedHome;
      }
    }

    return (
      (await cache.match("/offline")) ??
      new Response(
        "Open Daily Wordle once while online before using offline refresh.",
        {
          status: 503,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        },
      )
    );
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await fetch(request);

  if (response.ok) {
    await cache.put(request, response.clone());
  }

  return response;
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetch(request);

    if (response.ok) {
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    throw new Error(`No cached response for ${request.url}`);
  }
}
