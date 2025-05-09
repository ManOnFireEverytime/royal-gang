// app/api/topship/states/route.tsx
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const countryCode = searchParams.get("countryCode");

  if (!countryCode) {
    return NextResponse.json(
      { error: "Country code is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://topship-staging.africa/api/get-states?countryCode=${countryCode}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TOPSHIP_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch states" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching states:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}