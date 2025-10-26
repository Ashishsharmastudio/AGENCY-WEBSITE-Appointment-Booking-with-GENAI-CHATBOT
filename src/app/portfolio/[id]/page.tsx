import Image from "next/image";
import { notFound } from "next/navigation";

async function fetchProject(id: string) {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    const res = await fetch(`${base}/api/projects/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export default async function ProjectDetailPage(context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const project = await fetchProject(id);
  if (!project) return notFound();
  const live = project.liveUrl || project.link || project.demoUrl;
  const git = project.githubUrl || project.github || project.repoUrl;

  return (
    <section className="min-h-screen w-full bg-[#0a0a0a] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          {project.title}
        </h1>
        <p className="text-gray-400 mt-3">
          {project.category || "Project"} • {new Date(project.createdAt).toLocaleDateString()}
        </p>

        {project.image && (
          <div className="relative w-full h-96 mt-8 rounded-xl overflow-hidden border border-gray-800">
            <Image src={project.image} alt={project.title} fill className="object-cover" />
          </div>
        )}

        <div className="mt-8 space-y-6">
          {project.description && (
            <p className="text-lg text-gray-200">{project.description}</p>
          )}

          {Array.isArray(project.technologies) && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string, idx: number) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-gray-800 text-gray-200 text-sm border border-gray-700">
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-4 pt-2">
            {live && (
              <a href={live} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium">
                View Live
              </a>
            )}
            {git && (
              <a href={git} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium">
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


