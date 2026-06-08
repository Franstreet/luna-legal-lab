import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Rate limiter: 3 peticiones por hora por IP
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  prefix: "luna_legal_chat",
});

const SYSTEM_PROMPT = `Eres el asistente virtual de Luna Legal Lab, el despacho del Dr. Eduardo R. Luna Álvarez, especializado en derecho penal, ciberdelitos, derecho corporativo e inteligencia artificial.

Tu función es:
1. Escuchar el problema o duda legal del usuario con empatía y profesionalidad.
2. Ofrecer una orientación general básica (nunca consejo legal vinculante).
3. Evaluar la urgencia: si el asunto parece urgente o grave, mencionarlo.
4. Al final de tu respuesta, SIEMPRE incluir exactamente esta línea como última línea, sin más texto después:
   [MOSTRAR_OPCIONES]

Reglas estrictas:
- Responde siempre en el mismo idioma que el usuario.
- Sé conciso: máximo 3-4 párrafos cortos.
- No des asesoramiento legal específico, solo orientación general.
- Mantén un tono profesional, cercano y claro.
- Nunca inventes leyes o jurisprudencia.
- Si el tema está fuera de las especialidades del despacho (penal, corporativo, ciberdelitos, IA), indícalo amablemente.
- NUNCA uses formato Markdown: sin asteriscos, sin negritas, sin cursivas, sin encabezados, sin listas con guiones ni asteriscos. Solo texto plano.`;

export async function POST(request: Request) {
  // ── Rate limiting por IP ──────────────────────────────────────────────────
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "anonymous";

  const { success, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  // ── Validación de API key ─────────────────────────────────────────────────
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "API key not configured" }, { status: 500 });
  }

  // ── Llamada a Anthropic ───────────────────────────────────────────────────
  const { messages } = await request.json();

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return Response.json(data, { status: res.status });
  }

  return Response.json({ ...data, remaining });
}
