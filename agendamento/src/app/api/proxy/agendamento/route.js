export async function POST(req) {
  const body = await req.json();

  const response = await fetch('http://localhost:5236/api/Agendamento', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'fwjfpjewfokwfwqww65fdqw4fwe4veew41f5e6fw65c1wec56e1ve56qf6ewfe1f',
    },
    body: JSON.stringify(body),
  });

  const text = await response.text();

  return new Response(text, {
    status: response.status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
