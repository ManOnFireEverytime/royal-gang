// app/api/topship/book-shipment/route.tsx
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("Request data:", JSON.stringify(data, null, 2));
    
    // Validate required fields
    if (!data.shipment || !Array.isArray(data.shipment)) {
      return NextResponse.json(
        { error: "Invalid shipment data format" },
        { status: 400 }
      );
    }

    // First, save the shipment as a draft
    const saveResponse = await fetch(
      "https://topship-staging.africa/api/save-shipment",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.TOPSHIP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const saveData = await saveResponse.json();
    console.log("Full save-shipment response:", JSON.stringify(saveData, null, 2));
    
    if (!saveResponse.ok) {
      console.error("Topship Save Error:", saveData);
      return NextResponse.json(
        { 
          error: "Failed to save shipment",
          details: saveData 
        },
        { status: saveResponse.status }
      );
    }

    // Then pay for the shipment
    const payResponse = await fetch(
      "https://topship-staging.africa/api/pay-from-wallet",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.TOPSHIP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          detail: {
            shipmentId: saveData.id,
          },
        }),
      }
    );

    const payData = await payResponse.json();
    
    if (!payResponse.ok) {
      console.error("Topship Payment Error:", payData);
      return NextResponse.json(
        { 
          error: "Shipment saved but payment failed",
          details: payData 
        },
        { status: payResponse.status }
      );
    }

    return NextResponse.json(payData);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}