
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAiResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `Bạn là trợ lý ảo chuyên gia về Logistics và Kỹ thuật dự báo (Forecasting). 
        Hãy hỗ trợ sinh viên giải đáp thắc mắc về bài giảng, bài tập Excel/Matlab, quy trình chuỗi cung ứng và các mô hình dự báo như ARIMA, Exponential Smoothing, Holt-Winters.
        Hãy trả lời bằng tiếng Việt một cách chuyên nghiệp, tận tâm và ngắn gọn.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Xin lỗi, tôi gặp chút trục trặc khi kết nối. Bạn hãy thử lại sau nhé!";
  }
};
