"use client";

import { useEffect, useState } from "react";

export default function SimpleNotificationPrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show if notifications are supported and permission is default
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        setShow(true);
      }
    }
  }, []);

  const handleRequest = async () => {
    try {
      await Notification.requestPermission();
      setShow(false);
    } catch (e) {
      setShow(false);
    }
  };

  const handleDismiss = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-white border rounded-lg shadow-lg p-4 max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Enable notifications?</h3>
            <p className="text-sm text-gray-600">Get updates from our app.</p>
          </div>
          <div className="flex gap-2 ml-4">
            <button
              onClick={handleDismiss}
              className="px-3 py-1 text-sm border rounded"
            >
              Not now
            </button>
            <button
              onClick={handleRequest}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
            >
              Enable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
