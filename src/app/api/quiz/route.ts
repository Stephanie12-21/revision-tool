export async function POST(req: Request) {
  const formData = await req.formData();
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${backendUrl}/generatequiz/`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  console.log("Données reçues:", data);

  return new Response(JSON.stringify(data), { status: 200 });
}
