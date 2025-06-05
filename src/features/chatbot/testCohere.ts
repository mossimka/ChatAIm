import { getCohereResponse } from './chatbot';

async function test() {
  try {
    const input = "Hello, how are you?";
    const response = await getCohereResponse(input);
    console.log("Cohere response:", response);
  } catch (error) {
    console.error("Error calling Cohere API:", error);
  }
}

test();
