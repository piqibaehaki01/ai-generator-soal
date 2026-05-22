import { model } from "@/lib/gemini";

export async function POST(req) {
  try {
    const body = await req.json();

    const prompt = `
    Buatkan ${body.jumlah} soal ${body.mapel}
    `;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    return Response.json({
      soal: response,
    });
  } catch (error) {
    return Response.json({
      error: error.message,
    });
  }
}
