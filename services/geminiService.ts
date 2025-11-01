
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI Assistant will not function.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const MOCK_CLOUD_CONTEXT = `
  Current Cloud Environment Summary:
  - Security Posture: 3 critical vulnerabilities, 15 high-severity misconfigurations, 42 low-severity issues.
  - Cost Analysis: Monthly spend is $12,450. Potential monthly savings identified: $2,150.
  - Unused Resources: 5 unattached EBS volumes, 2 idle RDS instances.
  - Rightsizing Opportunities: 10 EC2 instances are over-provisioned.
  - Compliance Status: 85% compliant with SOC 2. Gaps identified in data encryption at rest policies.
`;

export const getAIAssistantResponse = async (userPrompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key is not configured. Please set the API_KEY environment variable.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: userPrompt,
      config: {
        systemInstruction: `You are Aura, an expert AI assistant for a cloud security and FinOps platform. Your goal is to provide concise, helpful, and actionable advice to users about their cloud environment. Use the following context to answer user questions. Be friendly and professional. Keep your answers brief and to the point.\n\n${MOCK_CLOUD_CONTEXT}`,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an error while processing your request. Please try again later.";
  }
};
