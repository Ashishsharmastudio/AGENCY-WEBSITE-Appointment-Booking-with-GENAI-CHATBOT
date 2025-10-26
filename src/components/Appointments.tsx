"use client";
import { useEffect, useState } from "react";
import { Calendar, User, MessageSquare } from "lucide-react";

// ✅ Define a strong type for appointments
interface Appointment {
  _id?: string;
  user?: { name?: string; email?: string; mobile?: string; address?: string };
  service?: string;
  date: string;
  message?: string;
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/appointments/all");
        const data = await res.json();
        // Normalize shape: older documents may have contact fields at the root
        const raw = data?.data || [];
        const normalized = raw.map((a: any) => {
          return {
            ...a,
            user: {
              name: a.user?.name || a.name || a.fullName || "",
              email: a.user?.email || a.email || "",
              mobile: a.user?.mobile || a.mobile || "",
              address: a.user?.address || a.address || "",
            },
          };
        });

        setAppointments(normalized);
      } catch {
        console.error("Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading)
    return <p className="text-center text-gray-300">Loading appointments...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">📅 All Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-400 text-center">No appointments yet.</p>
      ) : (
        appointments.map((a) => (
          <div
            key={a._id || a.date}
            className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-lg font-semibold flex items-center gap-2">
                <User size={18} className="text-cyan-400" />{" "}
                {a.user?.name || "Guest"}
              </p>
              <div className="text-gray-300 flex flex-col gap-1 mt-2">
                <p className="flex items-center gap-2">
                  <Calendar size={16} className="text-purple-400" />
                  {a.date ? new Date(a.date).toLocaleString() : "No date provided"}
                </p>
                {a.user?.email && (
                  <p className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z"/></svg>
                    <span className="inline-block bg-white/6 text-cyan-100 px-2 py-[2px] rounded-md">{a.user.email}</span>
                  </p>
                )}
                {a.user?.mobile && (
                  <p className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92V21a1 1 0 0 1-1.11 1 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2 3.11 1 1 0 0 1 3 2h4.09a1 1 0 0 1 1 .75c.12.65.28 1.28.48 1.88a1 1 0 0 1-.25 1l-1.2 1.2a16 16 0 0 0 6 6l1.2-1.2a1 1 0 0 1 1-.25c.6.2 1.23.36 1.88.48a1 1 0 0 1 .75 1V21z"/></svg>
                    <span className="inline-block bg-cyan-600 text-white px-3 py-1 rounded-md font-medium">{a.user.mobile}</span>
                  </p>
                )}
                {a.message && (
                  <p className="text-gray-400 flex items-center gap-2 mt-2">
                    <MessageSquare size={16} /> {a.message}
                  </p>
                )}
              </div>
            </div>

            {a.service && (
              <p className="mt-4 sm:mt-0 font-medium">
                <span className="inline-block bg-gradient-to-r from-purple-400 to-cyan-300 text-black px-3 py-1 rounded-full">{a.service}</span>
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
