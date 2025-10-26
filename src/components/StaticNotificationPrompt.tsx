"use client";

export default function StaticNotificationPrompt() {
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
              onClick={() => {
                if (typeof window !== "undefined" && "Notification" in window) {
                  Notification.requestPermission();
                }
              }}
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
