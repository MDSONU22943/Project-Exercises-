const axios = require("axios");

async function getAIResponse(resumeText) {
    try {
        const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
        model: "llama3-8b-8192", // ✅ FINAL WORKING MODEL
        messages: [
            {
                role: "system",
                content: "You are a professional resume reviewer."
            },
            {
                role: "user",
                content: `Review this resume and give:
1. Strengths
2. Weaknesses
3. Suggestions
4. Missing skills

Resume:
${resumeText.slice(0, 4000)}`
            }
        ],
        temperature: 0.7
    },
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        }
    }
        );

        return response.data.choices[0].message.content;

    } catch (error) {
        console.error("GROQ ERROR:", error.response?.data || error.message);
        throw new Error("AI request failed");
    }
}

module.exports = { getAIResponse };