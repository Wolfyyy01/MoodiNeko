import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getRecommendations = async (mood: string) => {
  const completion = await client.completions.create({
    model: "gpt-4o-mini",
    prompt: `Recommend 5 anime titles for someone feeling "${mood}". 
For each, give a brief reason (1 sentence) why it fits that mood.
Respond in this format:

1. Title - Reason
2. Title - Reason
...`,
    max_tokens: 250,
  });

  const lines = completion.choices[0]?.text?.split("\n") ?? [];

  const recommendations = lines
    .map(line => {
      const match = line.match(/^\d+\.\s*(.*?)\s*-\s*(.*)$/);
      if (!match) return null;
      return {
        title: match?.[1]?.trim() ?? "",
        reason: match?.[2]?.trim() ?? "",
      };
    })
    .filter(Boolean) as Array<{ title: string; reason: string }>;

  return recommendations;
};
