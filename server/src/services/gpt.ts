import OpenAI from "openai";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export const getRecommendations = async (mood: string) => {
  const completion = await client.completions.create({
    model: 'gpt-4o-mini',
    prompt: `Sugerează 5 anime-uri pentru cineva care se simte: ${mood}. Listează doar titlurile, unul pe rând, fără descriere.`,
    max_tokens: 100,
  });

  const text = completion.choices[0]?.text ?? "";
  const titles = text
    .split('\n')
    .map(line => line.replace(/^\d+[\).]?\s*/, '').trim()) // curăță numerele și spațiile
    .filter(Boolean); // elimină golurile

  return titles;
};
