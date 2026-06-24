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
    let refreshing = false;
    let waitingWorker: ServiceWorker | null = null;

    function notifyUpdateAvailable(worker: ServiceWorker) {
      waitingWorker = worker;
      window.dispatchEvent(new Event("daily-wordle-update-available"));
    }

    function applyUpdate() {
      if (!waitingWorker) {
        window.location.reload();
        return;
      }

      waitingWorker.postMessage({ type: "SKIP_WAITING" });
    }

    function handleControllerChange() {
      if (refreshing) {
        return;
      }

      refreshing = true;
      window.location.reload();
    }

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

        if (registration.waiting) {
          notifyUpdateAvailable(registration.waiting);
        }

        registration.addEventListener("updatefound", () => {
          const installingWorker = registration.installing;

          if (!installingWorker) {
            return;
          }

          installingWorker.addEventListener("statechange", () => {
            if (
              installingWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              notifyUpdateAvailable(installingWorker);
            }
          });
        });

        registration.update().catch(() => {
          // A failed update check should not block the already-cached app shell.
        });
      } catch (error) {
        console.warn("Offline reload registration failed.", error);
      }
    }

    registerServiceWorker();
    window.addEventListener("daily-wordle-apply-update", applyUpdate);
    navigator.serviceWorker.addEventListener(
      "controllerchange",
      handleControllerChange,
    );

    return () => {
      isMounted = false;
      window.removeEventListener("daily-wordle-apply-update", applyUpdate);
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        handleControllerChange,
      );
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
