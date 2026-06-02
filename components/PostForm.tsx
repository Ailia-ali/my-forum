"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const title = form.get("title") as string;
    const content = form.get("content") as string;

    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" }
    });

    setSubmitting(false);
    router.refresh();
    (e.target as HTMLFormElement).reset();
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg bg-gray-50">
      <input name="title" placeholder="标题" required className="w-full p-2 mb-3 border rounded" />
      <textarea name="content" placeholder="想说点什么..." required rows={4} className="w-full p-2 mb-3 border rounded" />
      <button type="submit" disabled={submitting}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50">
        {submitting ? "发布中..." : "发布"}
      </button>
    </form>
  );
}

