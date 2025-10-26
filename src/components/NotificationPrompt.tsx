"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "pwa:notificationPromptDismissed";

export default function NotificationPrompt() {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isSupported = "Notification" in window && "serviceWorker" in navigator;
    if (!isSupported) return;
    const dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    const current = Notification.permission; // default | granted | denied
    if (!dismissed && current === "default") {
      setShouldShow(true);
    }
  }, []);

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        // Show a sample welcome notification via SW (best practice)
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg) {
          reg.showNotification("Notifications enabled", {
            body: "We'll let you know about updates.",
            icon: "/Apps.png",
            badge: "/Apps.png",
            tag: "welcome",
          });
        }
      }
      setShouldShow(false);
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (_error) {
      setShouldShow(false);
      localStorage.setItem(STORAGE_KEY, "1");
    }
  };

  const dismiss = () => {
    setShouldShow(false);
    localStorage.setItem(STORAGE_KEY, "1");
  };

  if (!shouldShow) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-lg p-4 flex items-start gap-3">
        <div className="flex-1">
          <div className="font-semibold">Enable notifications?</div>
          <div className="text-sm text-gray-600">Get updates even when the app is closed.</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={dismiss} className="px-3 py-2 text-sm rounded-lg border border-gray-300">Not now</button>
          <button onClick={requestPermission} className="px-3 py-2 text-sm rounded-lg bg-sky-500 text-white">Enable</button>
        </div>
      </div>
    </div>
  );
}


