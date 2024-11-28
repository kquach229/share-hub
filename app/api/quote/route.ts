import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, content } = await request.json();

  try {
    const json = await prisma.quoteData.create({
      data: {
        name,
        content,
        userId,
      },
    });

    return NextResponse.json(json);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error Saving quote",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await prisma.quoteData.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        content: true,
        createdAt: true,
      },
    });

    return NextResponse.json(json);
  } catch (error) {
    console.error("Error fetching quotes", error);
    return NextResponse.json(
      {
        error: "Error fetching quotes",
      },
      { status: 500 }
    );
  }
}
