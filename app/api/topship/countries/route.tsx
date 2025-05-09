// app/api/topship/countries/route.tsx
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://topship-staging.africa/api/get-countries",
      {
        headers: {
          Authorization: `Bearer ${process.env.TOPSHIP_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch countries" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}