const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `You are a code reviewer with expertise in development. You look for problems and suggest clear, efficient solutions to the developer.`
});

async function generateContent(code) {
  try {
    const payload = { input: code };

    let result;
    if (typeof model.generateText === 'function') {
      result = await model.generateText(payload);
    } else if (typeof model.generate === 'function') {
      result = await model.generate(payload);
    } else if (typeof model.generateContent === 'function') {
      // older shape where function accepts raw string
      result = await model.generateContent(code);
    } else {
      throw new Error('Unsupported model API - update @google/generative-ai usage');
    }

    // Normalize common response shapes
    const text =
      result?.output?.[0]?.content ||
      result?.text ||
      (typeof result === 'string' ? result : undefined) ||
      (result?.response && typeof result.response.text === 'function' ? result.response.text() : result?.response?.text);

    return text || 'No response from model';
  } catch (err) {
    console.error('AI service error:', err);
    throw err;
  }
}

module.exports = generateContent;