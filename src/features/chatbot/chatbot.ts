import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
    token: "COHERE_API_KEY",
});

export async function getCohereResponse(message: string): Promise<string> {
    const chat = await cohere.chat({
        model: "command",
        message,
    });
    return chat.text;
}
