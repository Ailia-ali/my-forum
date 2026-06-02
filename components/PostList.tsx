interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  author: { name: string | null };
}

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-600 mt-2">{post.content}</p>
          <div className="text-sm text-gray-400 mt-3">
            {post.author.name || "匿名用户"} · {new Date(post.createdAt).toLocaleDateString("zh-CN")}
          </div>
        </div>
      ))}
    </div>
  );
}