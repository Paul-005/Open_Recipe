const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = async function getEmbedding(text) {
    const model = genAI.getGenerativeModel({
        model: "gemini-embedding-001",
    });

    const result = await model.embedContent(text);
    return result.embedding.values;
}