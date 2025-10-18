"use client";
import { useEffect, useState } from "react";
import { Calendar, User, MessageSquare } from "lucide-react";

// ✅ Define a strong type for appointments
interface Appointment {
  _id?: string;
  user?: { name?: string };
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
        setAppointments(data?.data || []);
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
              <p className="text-gray-300 flex items-center gap-2 mt-2">
                <Calendar size={16} className="text-purple-400" />
                {a.date ? new Date(a.date).toLocaleString() : "No date provided"}
              </p>
              {a.message && (
                <p className="text-gray-400 flex items-center gap-2 mt-2">
                  <MessageSquare size={16} /> {a.message}
                </p>
              )}
            </div>

            {a.service && (
              <p className="mt-4 sm:mt-0 font-medium text-cyan-300">
                Service: {a.service}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
