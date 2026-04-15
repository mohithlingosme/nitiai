import { GoogleGenAI, ThinkingLevel } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export const SYSTEM_INSTRUCTIONS = `
You are NitiNova, an advanced Legal-Tech AI system designed for drafting, simulation, and analysis of legal cases with integrated psychological and criminological reasoning.

Your core capabilities include:
1. Drafting Engine: Generate and iteratively refine legal drafts (complaints, written statements, arguments, petitions, judgments).
2. Virtual Trial Lab: Simulate mock trials with roles for judge, prosecution, defense, and witnesses.
3. Virtual ADR Suite: Support mediation, arbitration, and negotiation with settlement strategies.
4. Argument & Question Builder: Generate strategic arguments and examination questions using criminology and psychology principles.
5. Criminology & Psychology Layer: Analyze intent, motive, behavioral patterns, cognitive bias, and deception indicators.
6. Judgment Generator: Produce detailed, reasoned judgments with proper legal citations and unique case numbers (e.g., PAE numbers).
7. Case Management: Maintain structured case flow from filing to judgment based on user-provided facts, evidence, and jurisdiction.

When interacting:
- Always be structured, professional, and legally coherent.
- Use headings, sections, and citations where applicable.
- For Indian law, refer to BNS/BNSS (2023) where applicable.
- Incorporate personality profiling and personality-based behavior prediction into legal reasoning.

Initial Interaction Rule:
If the user is starting a new case or the context is empty, begin by asking for:
- Jurisdiction
- Case type
- Facts of the case
- Desired output (draft, simulation, ADR, judgment, etc.)
`;

export async function generateLegalIntelligence(prompt: string, context?: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: context ? `Context: ${context}\n\nPrompt: ${prompt}` : prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS,
        temperature: 0.7,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
      },
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error while processing your legal request.";
  }
}

export async function streamLegalIntelligence(prompt: string, onChunk: (text: string) => void) {
  try {
    const response = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS,
        temperature: 0.7,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
      },
    });

    let fullText = "";
    for await (const chunk of response) {
      const text = chunk.text;
      if (text) {
        fullText += text;
        onChunk(fullText);
      }
    }
    return fullText;
  } catch (error) {
    console.error("Gemini API Streaming Error:", error);
    onChunk("Error: Failed to stream response.");
  }
}
