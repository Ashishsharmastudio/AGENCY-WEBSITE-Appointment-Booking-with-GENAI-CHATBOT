import { notFound } from "next/navigation";
import Image from "next/image";

async function fetchBlog(slug: string) {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    const res = await fetch(`${base}/api/blogs/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export default async function BlogDetailPage(context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const blog = await fetchBlog(slug);
  if (!blog) return notFound();

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-6 pt-24 pb-16 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
          {blog.title}
        </h1>
        <p className="text-gray-400 mt-3">
          {new Date(blog.createdAt).toLocaleDateString()} • By {blog.author || "Admin"} • {blog.category || "General"}
        </p>
        {blog.image && (
          <Image
          src={blog.image}
          alt={blog.title}
          width={800}
          height={400}
          className="w-full rounded-xl border border-white/20 mt-8"
        />
        )}
        <article className="prose prose-invert max-w-none mt-8">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>
      </div>
    </section>
  );
}