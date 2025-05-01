import { NextResponse } from 'next/server';
import axios from "axios";

export async function POST(req) {
    try {
        const { formData } = await req.json();
        const { careerGoal, educationLevel, learningStyle } = formData;
        const prompt = `
    You are a career guidance assistant.
    Generate a step-by-step career roadmap for someone who wants to become a ${careerGoal}.
    Their current education level is: ${educationLevel}.
    They prefer ${learningStyle} learning.
    Give the output in clear stages (e.g., Learn Basics, Intermediate, Advanced, Projects, Internships, Job Prep, etc.) with the prefrred ${learningStyle} resources.
    `;

        const openAiResponse = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 1500, // Adjust the token limit as needed
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const roadmap = openAiResponse.data.choices[0]?.message?.content || "No response generated.";
        console.log(roadmap)
        return NextResponse.json({ roadmap }, { status: 200 });
    } catch (error) {
        console.error("Error generating roadmap:", error);
        return NextResponse.json({ message: 'Failed to generate roadmap' }, { status: 500 });
    }
}