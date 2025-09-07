export async function POST(req: Request) {
  const formData = await req.formData();
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${backendUrl}/analyser/`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  return new Response(JSON.stringify(data), { status: response.status });
}
