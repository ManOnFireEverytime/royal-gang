import { NextRequest, NextResponse } from "next/server";

// app/api/verify-paystack/route.js
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json(
      { status: false, message: "No reference provided" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { status: false, message: "Failed to verify transaction" },
        { status: 500 },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { status: false, message: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { status: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
