import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  }

  const { title, content } = await req.json();
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: session.user.id
    }
  });

  return NextResponse.json(post, { status: 201 });
}