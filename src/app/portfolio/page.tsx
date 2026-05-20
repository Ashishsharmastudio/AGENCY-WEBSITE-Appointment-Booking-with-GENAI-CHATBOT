// src/app/portfolio/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

async function getProjects() {
  try {
    // ✅ Ensure baseUrl always has protocol
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/api/projects`, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <section className="min-h-screen w-full bg-[#0a0a0a] text-white py-20 px-6">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-14">
        Our <span className="text-cyan-400">Portfolio</span>
      </h1>

      {/* Projects */}
      {projects.length > 0 ? (
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {projects.map(
            (project: {
              _id: string;
              title: string;
              description: string;
              image?: string;
              liveUrl?: string;
              githubUrl?: string;
            }) => (
              <div
                key={project._id}
                className="group relative bg-gray-900/80 border border-gray-800 
                          rounded-2xl overflow-hidden shadow-lg 
                          hover:shadow-cyan-500/40 hover:border-cyan-400/50 
                          transition-all duration-500 transform hover:scale-[1.03]"
              >
                {/* Image */}
                <div className="relative w-full h-60 overflow-hidden">
                  <Image
                    src={project?.image || "/vercel.svg"}
                    alt={project?.title || "Project"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-2xl font-semibold group-hover:text-cyan-400 transition-colors duration-300">
                    {project?.title || "Untitled Project"}
                  </h3>
                  <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                    {project?.description || "No description available."}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <Link
                      href={`/portfolio/${project._id}`}
                      className="px-3 py-1 rounded-md bg-cyan-600/20 border border-cyan-600/40 text-cyan-300 text-xs hover:bg-cyan-600/30"
                    >
                      View Details
                    </Link>

                    {project?.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-emerald-600/20 border border-emerald-600/40 text-emerald-300 text-xs hover:bg-emerald-600/30"
                      >
                        Live Demo <ExternalLink size={14} />
                      </a>
                    )}

                    {project?.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-gray-600/20 border border-gray-600/40 text-gray-200 text-xs hover:bg-gray-600/30"
                      >
                        GitHub <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">🚧 No projects available yet.</p>
          <p className="text-gray-500 text-sm mt-2">
            Please check back later for our latest work!
          </p>
        </div>
      )}
    </section>
  );
}
