import { NextResponse } from "next/server";
import { projectId, dataset } from "@/sanity/client";

export async function POST(request: Request) {
  try {
    const { name, quote } = await request.json();

    if (!quote) {
      return NextResponse.json({ error: "Quote is required" }, { status: 400 });
    }
    const token = process.env.SANITY_API_TOKEN;

    if (!projectId || !token) {
      console.error("Missing Sanity configuration for reviews");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Direct fetch to Sanity HTTP API to create a document
    const sanityUrl = `https://${projectId}.api.sanity.io/v2023-01-01/data/mutate/${dataset}`;

    const mutations = [
      {
        create: {
          _type: "testimonial",
          name: name || "Anónimo",
          quote: quote,
          approved: true, // Auto-approve for web
        },
      },
    ];

    const response = await fetch(sanityUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ mutations }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Sanity error:", errorData);
      throw new Error("Failed to save to Sanity");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in reviews API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
