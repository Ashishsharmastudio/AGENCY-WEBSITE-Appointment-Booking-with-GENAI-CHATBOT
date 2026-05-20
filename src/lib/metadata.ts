const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export type ProjectMetadata = {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  technologies?: string[];
  category?: string;
  createdAt: string;
  updatedAt?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export type BlogPostMetadata = {
  title: string;
  excerpt?: string;
  description?: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  createdAt: string;
  image?: string;
  category?: string;
  slug: string;
}

export function generateBlogMetadata(blog: BlogPostMetadata) {
  const url = `${baseUrl}/blog/${blog.slug}`;

  return {
    title: blog.title,
    description: blog.excerpt || blog.description || `${blog.title} - Read our latest insights`,
    keywords: [blog.category || "blog", "article", "insights", "web development"].filter(Boolean),
    authors: [{ name: blog.author || "Agency Team" }],
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.description,
      type: "article",
      url,
      images: blog.image ? [{ url: blog.image, width: 1200, height: 630, alt: blog.title }] : [],
      publishedTime: blog.publishedAt || blog.createdAt,
      modifiedTime: blog.updatedAt || blog.createdAt,
      authors: [blog.author || "Agency Team"],
      siteName: "Agency Website",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt || blog.description,
      images: blog.image ? [blog.image] : [],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateProjectMetadata(project: ProjectMetadata) {
  const url = `${baseUrl}/portfolio/${project._id}`;

  return {
    title: project.title,
    description: project.description || `${project.title} - View our portfolio project`,
    keywords: [...(project.technologies || []), "portfolio", "project", "web development"].filter(Boolean),
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
      url,
      images: project.image ? [{ url: project.image, width: 1200, height: 630, alt: project.title }] : [],
      modifiedTime: project.updatedAt || project.createdAt,
      siteName: "Agency Website",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : [],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateProjectSchema(project: ProjectMetadata) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: project.title,
    description: project.description,
    image: project.image,
    url: project.liveUrl,
    datePublished: project.createdAt,
    dateModified: project.updatedAt || project.createdAt,
    author: {
      "@type": "Organization",
      name: "Agency Website",
      url: baseUrl
    },
    publisher: {
      "@type": "Organization",
      name: "Agency Website",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`
      }
    },
    about: {
      "@type": "Thing",
      name: project.category || "Project",
    },
    ...(project.technologies && {
      keywords: project.technologies.join(", ")
    })
  };
}

export function generateBlogSchema(blog: BlogPostMetadata) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt || blog.description,
    image: blog.image,
    datePublished: blog.publishedAt || blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    author: {
      "@type": "Person",
      name: blog.author || "Agency Team"
    },
    publisher: {
      "@type": "Organization",
      name: "Agency Website",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`
      }
    }
  };
}