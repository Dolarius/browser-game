"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !("serviceWorker" in navigator) ||
      window.location.protocol === "file:"
    ) {
      return;
    }

    let isMounted = true;

    async function registerServiceWorker() {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });

        if (!isMounted) {
          return;
        }

        await navigator.serviceWorker.ready;
        cacheCurrentStaticAssets(registration);
        registration.update().catch(() => {
          // A failed update check should not block the already-cached app shell.
        });
      } catch (error) {
        console.warn("Offline reload registration failed.", error);
      }
    }

    registerServiceWorker();

    return () => {
      isMounted = false;
    };
  }, []);

  return null;
}

function cacheCurrentStaticAssets(registration: ServiceWorkerRegistration) {
  const urls = performance
    .getEntriesByType("resource")
    .map((entry) => entry.name)
    .filter((url) => {
      try {
        const resourceUrl = new URL(url);

        return (
          resourceUrl.origin === window.location.origin &&
          resourceUrl.pathname.startsWith("/_next/static/")
        );
      } catch {
        return false;
      }
    });

  if (urls.length === 0) {
    return;
  }

  registration.active?.postMessage({
    type: "CACHE_STATIC_URLS",
    urls: Array.from(new Set(urls)),
  });
}
