"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Blog editor (rich text / markdown placeholder)
function BlogForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!title || !content) {
      setMessage("Title and content are required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, content, author, category, image, isPublished }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create blog");
      setMessage("Blog published successfully");
      setTitle("");
      setSlug("");
      setContent("");
      setAuthor("");
      setCategory("");
      setImage("");
      setIsPublished(false);
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 text-white"
    >
      <h2 className="text-2xl font-bold mb-4">✍️ Write a Blog</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Slug (auto-generate if empty)"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white outline-none"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <textarea
          rows={4}
          placeholder="Author"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white outline-none resize-none"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          rows={10}
          placeholder="Blog Content (Markdown/Editor)"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white outline-none resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white outline-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cover Image URL"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white outline-none"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <span>Publish now</span>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
        {message && (
          <p className="text-sm text-white/80">{message}</p>
        )}
      </form>
    </motion.div>
  );
}

// Portfolio project form
function PortfolioForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [image, setImage] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!title || !description) {
      setMessage("Title and description are required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category,
          image,
          technologies: technologies.split(",").map((t) => t.trim()).filter(Boolean),
          liveUrl,
          githubUrl,
          isFeatured,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create project");
      setMessage("Project added successfully");
      setTitle("");
      setDescription("");
      setCategory("");
      setTechnologies("");
      setImage("");
      setLiveUrl("");
      setGithubUrl("");
      setIsFeatured(false);
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 text-white"
    >
      <h2 className="text-2xl font-bold mb-4">📂 Add Portfolio Project</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Title"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows={4}
          placeholder="Project Description"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white outline-none resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white outline-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Technologies Used (comma separated)"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white outline-none"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
        />
        <input
          type="url"
          placeholder="Live Demo URL"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white outline-none"
          value={liveUrl}
          onChange={(e) => setLiveUrl(e.target.value)}
        />
        <input
          type="url"
          placeholder="GitHub / Source Code URL"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white outline-none"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white outline-none"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          <span>Feature this project</span>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish Project"}
        </button>
        {message && (
          <p className="text-sm text-white/80">{message}</p>
        )}
      </form>
    </motion.div>
  );
}

export default function AdminForm() {
  const [type, setType] = useState<"blog" | "portfolio">("blog");

  return (
    <div className="space-y-8">
      {/* Toggle buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setType("blog")}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            type === "blog"
              ? "bg-gradient-to-r from-purple-500 to-cyan-400 text-white"
              : "bg-white/10 text-gray-300"
          }`}
        >
          ✍️ Blog
        </button>
        <button
          onClick={() => setType("portfolio")}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            type === "portfolio"
              ? "bg-gradient-to-r from-purple-500 to-cyan-400 text-white"
              : "bg-white/10 text-gray-300"
          }`}
        >
          📂 Portfolio
        </button>
      </div>

      {/* Conditional form */}
      {type === "blog" ? <BlogForm /> : <PortfolioForm />}
    </div>
  );
}
