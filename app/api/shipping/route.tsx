// app/api/shipping/route.ts
import { NextRequest, NextResponse } from "next/server";

const TOPSHIP_API_BASE_URL = "https://topship-staging.africa/api";
const TOPSHIP_API_KEY = process.env.TOPSHIP_API_KEY;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const endpoint = searchParams.get("endpoint");
  
  if (!endpoint) {
    return NextResponse.json(
      { status: false, message: "No endpoint specified" },
      { status: 400 }
    );
  }
  
  // Build the URL with any additional query parameters
  let url = `${TOPSHIP_API_BASE_URL}/${endpoint}`;
  searchParams.forEach((value, key) => {
    if (key !== "endpoint") {
      url += url.includes("?") ? "&" : "?";
      url += `${key}=${encodeURIComponent(value)}`;
    }
  });
  
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOPSHIP_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`Topship API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Shipping API error:", error);
    return NextResponse.json(
      { status: false, message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const endpoint = searchParams.get("endpoint");
  
  if (!endpoint) {
    return NextResponse.json(
      { status: false, message: "No endpoint specified" },
      { status: 400 }
    );
  }
  
  try {
    const body = await request.json();
    const response = await fetch(`${TOPSHIP_API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOPSHIP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new Error(`Topship API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Shipping API error:", error);
    return NextResponse.json(
      { status: false, message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}