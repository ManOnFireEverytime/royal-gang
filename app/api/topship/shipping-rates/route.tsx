// app/api/topship/shipping-rates/route.tsx
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const shipmentDetailStr = searchParams.get("shipmentDetail");

  if (!shipmentDetailStr) {
    return NextResponse.json(
      { error: "Shipment details are required" },
      { status: 400 }
    );
  }

  try {
    const shipmentDetail = JSON.parse(shipmentDetailStr);
    
    const response = await fetch(
      `https://topship-staging.africa/api/get-shipment-rate?shipmentDetail=${JSON.stringify(shipmentDetail)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TOPSHIP_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch shipping rates" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}