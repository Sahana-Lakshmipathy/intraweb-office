import { GoogleGenAI, Type } from "@google/genai";

// Ensure API key is available
if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
const model = "gemini-2.5-flash";

// Schema definitions
const eventSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      date: { type: Type.STRING },
      time: { type: Type.STRING },
      location: { type: Type.STRING },
      department: { type: Type.STRING },
      description: { type: Type.STRING }
    },
    required: ["title", "date", "time", "location", "department", "description"]
  }
};

const announcementSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      date: { type: Type.STRING },
      author: { type: Type.STRING },
      content: { type: Type.STRING }
    },
    required: ["title", "date", "author", "content"]
  }
};

const financialNewsSchema = {
  type: Type.OBJECT,
  properties: {
    headlines: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    }
  },
  required: ["headlines"]
};

// Generate Events
export const generateEvents = async (count = 8) => {
  const prompt = `Generate a list of ${count} realistic, diverse, and engaging upcoming innovative workshop sessions and social extra-curricular events for an office intranet portal. Include workshops, seminars, cultural fests, and sports events.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: eventSchema
      }
    });

    return JSON.parse(response.text.trim());
  } catch (e) {
    console.error("Failed to parse events JSON:", e);
    return [];
  }
};

// Generate Announcements
export const generateAnnouncements = async (count = 5) => {
  const prompt = `Generate ${count} recent, relevant announcements for an office intranet. Include topics like project deadlines, office facility updates, and employee achievements.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: announcementSchema
      }
    });

    return JSON.parse(response.text.trim());
  } catch (e) {
    console.error("Failed to parse announcements JSON:", e);
    return [];
  }
};

// Generate Club Description
export const generateClubDescription = async (clubName, category) => {
  const prompt = `Create a short, exciting, and welcoming description (about 3-4 sentences) for the "${clubName}", an office club in the "${category}" category. The description should attract new employees to join.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt
    });

    return response.text;
  } catch (e) {
    console.error("Failed to generate club description:", e);
    return "";
  }
};

// Generate Financial News
export const generateFinancialNews = async (count = 4) => {
  const prompt = `Generate a list of ${count} diverse, short, and engaging financial or tech news headlines that would be interesting to office people. Topics can include market trends, major company news, or new technology impacting finance.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: financialNewsSchema
      }
    });

    const parsed = JSON.parse(response.text.trim());
    return parsed.headlines || [];
  } catch (e) {
    console.error("Failed to parse financial news JSON:", e);
    return [
      "Tech stocks show volatility amid new inflation data.",
      "Global chip shortage continues to impact electronics prices.",
      "Fintech startups see record funding in the last quarter.",
      "Experts discuss the future of cryptocurrency in the global economy."
    ];
  }
};

// Create AI Chat Instance
export const createChat = () => {
  return ai.chats.create({
    model,
    config: {
      systemInstruction: "You are a friendly and helpful AI assistant for an office intranet portal called 'Colleague Connect'. Your role is to answer questions from employees about campus life, events, work-life balance, and office facilities. Keep your answers concise, accurate, and encouraging. You do not have access to personal data. If asked for information you don't have, politely state your limitations."
    }
  });
};
