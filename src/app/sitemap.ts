import { MetadataRoute } from "next";

interface BlogData {
  slug: string;
  // Add other fields if needed
}

interface ProjectData {
  _id: string;
  // Add other fields if needed
}

async function fetchAllSlugs() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const [blogsRes, projectsRes] = await Promise.all([
      fetch(`${baseUrl}/api/blogs?published=true`),
      fetch(`${baseUrl}/api/projects`),
    ]);

    const blogs: BlogData[] = await blogsRes.json();
    const projects: ProjectData[] = await projectsRes.json();

    return {
      blogs: blogs?.map((blog) => blog.slug) || [],
      projects: projects?.map((project) => project._id) || [],
    };
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return { blogs: [], projects: [] };
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const { blogs, projects } = await fetchAllSlugs();

  const routes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/blog",
    "/contact",
    "/booking",
  ];

  const staticPages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const blogPages = blogs.map((slug: string) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const portfolioPages = projects.map((id: string) => ({
    url: `${baseUrl}/portfolio/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...portfolioPages];
}