import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
    token: "COHERE_API_KEY", // Replace with your actual Cohere API key
});

(async () => {
    const chat = await cohere.chat({
        model: "command",
        message: "Tell me a story about bored programmer in 5 parts!",
    });

    console.log(chat.text);
})();
