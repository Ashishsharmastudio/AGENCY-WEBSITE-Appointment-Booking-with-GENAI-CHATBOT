"use client";
import { useEffect } from "react";

interface WindowWithNotification extends Window {
  showNotification?: (text: string) => void;
}

export default function ClientScripts() {
  useEffect(() => {
    // Cursor logic
    const cursor = document.getElementById("cursor");
    const handleMouseMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", handleMouseMove);

    const handleMouseEnter = () => {
      if (cursor) {
        cursor.style.width = "22px";
        cursor.style.height = "22px";
        cursor.style.opacity = "0.5";
      }
    };
    const handleMouseLeave = () => {
      if (cursor) {
        cursor.style.width = "8px";
        cursor.style.height = "8px";
        cursor.style.opacity = "1";
      }
    };

    const interactiveElements = document.querySelectorAll(
      "a, button, .document-item, .world-continent, .map-hotspot, .dashboard-widget",
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Notification logic
    const win = window as WindowWithNotification;
    win.showNotification = function (text: string) {
      const box = document.getElementById("notif-box");
      const textEl = document.getElementById("notif-text");
      if (box && textEl) {
        textEl.innerText = text;
        box.style.display = "block";
        setTimeout(() => {
          box.style.display = "none";
        }, 4500);
      }
    };

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return null;
}
