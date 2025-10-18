import Image from "next/image";

interface ProjectProps {
  project: { title: string; description: string; imageUrl: string };
}

export default function ProjectCard({ project }: ProjectProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="relative w-full h-40 mb-4">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <h3 className="text-lg font-bold">{project.title}</h3>
      <p className="text-gray-600">{project.description}</p>
    </div>
  );
}
