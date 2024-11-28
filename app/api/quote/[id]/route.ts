import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const { id } = params;

  try {
    const json = await prisma.quoteData.findUnique({
      where: {
        id,
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

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const { id } = params;

  try {
    const existingQuote = await prisma.quoteData.findUnique({
      where: {
        id,
      },
    });

    if (!existingQuote) {
      return NextResponse.json({
        error: "Quote not found",
        status: 404,
      });
    }

    await prisma.quoteData.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "Quote deleted", id });
  } catch (error) {
    console.error("Error deleting quote", error);
    return NextResponse.json(
      {
        error: "Error deleting quote",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const { id } = params;

  try {
    const body = await request.json();
    const existingQuote = await prisma.quoteData.findUnique({
      where: {
        id,
      },
    });

    if (!existingQuote) {
      return NextResponse.json({
        error: "Quote not found",
        status: 404,
      });
    }

    await prisma.quoteData.update({
      where: {
        id,
      },
      data: body,
    });

    return NextResponse.json({ message: "Quote updated", id });
  } catch (error) {
    console.error("Error deleting quote", error);
    return NextResponse.json(
      {
        error: "Error deleting quote",
      },
      { status: 500 }
    );
  }
}
