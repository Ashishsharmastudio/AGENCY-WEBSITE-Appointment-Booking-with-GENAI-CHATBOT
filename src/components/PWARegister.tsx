"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isLocalhost = Boolean(
      window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "[::1]"
    );

    const isSecureContext = window.isSecureContext || isLocalhost;
    if (!("serviceWorker" in navigator) || !isSecureContext) {
      return;
    }

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/service-worker.js");
        // Listen for updates
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              // Optional: prompt user to refresh. For now, activate immediately.
              reg.waiting?.postMessage({ type: "SKIP_WAITING" });
            }
          });
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("SW registration failed", err);
      }
    };

    register();

    // On page refresh, claim clients immediately once controller changes
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      // no-op; could show a toast to reload if desired
    });
  }, []);

  return null;
}


