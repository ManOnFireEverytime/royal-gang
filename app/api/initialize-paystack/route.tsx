import { NextRequest, NextResponse } from "next/server";

// app/api/initialize-paystack/route.js
export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { status: false, message: "Failed to initialize transaction" },
        { status: 500 },
      );
    }

    const responseData = await response.json();

    return NextResponse.json(responseData);
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
