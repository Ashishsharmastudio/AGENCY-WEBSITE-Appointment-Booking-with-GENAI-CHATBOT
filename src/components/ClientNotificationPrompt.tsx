"use client";

import dynamic from "next/dynamic";

const NotificationPrompt = dynamic(() => import("./NotificationPrompt"), {
  ssr: false,
});

export default function ClientNotificationPrompt() {
  return <NotificationPrompt />;
}
