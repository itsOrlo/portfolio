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
      // Añadimos un timeout corto para no dejar colgada la función
      signal: AbortSignal.timeout(8000) 
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error detail');
      console.error(`n8n error: ${response.status} - ${errorText}`);
      return NextResponse.json(
        { success: false, message: `Error de n8n: ${response.status}` }, 
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in contact API route:", error);
    
    let errorMessage = "Error al enviar el mensaje";
    if (error.name === 'TimeoutError') errorMessage = "El servidor de n8n tardó demasiado en responder";
    else if (error.message) errorMessage = error.message;

    return NextResponse.json(
      { success: false, message: errorMessage }, 
      { status: 500 }
    );
  }
}
