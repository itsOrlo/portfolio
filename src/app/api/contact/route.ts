import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const webhookUrl = "https://n8n.ionoshub.net/webhook/e69358b6-0641-4952-82e5-885059639c0a";

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`n8n responded with status: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { success: false, message: "Error al enviar el mensaje" }, 
      { status: 500 }
    );
  }
}
