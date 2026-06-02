import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";

const prisma = new PrismaClient();

export default async function HomePage() {
  const session = await auth();
  const posts = await prisma.post.findMany({
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-8">论坛</h1>
      
      {session ? (
        <PostForm />
      ) : (
        <p className="mb-6 text-gray-500">
          请先<a href="/login" className="text-blue-600 underline">登录</a>后再发帖
        </p>
      )}

      <PostList posts={posts} />
    </div>
  );
}