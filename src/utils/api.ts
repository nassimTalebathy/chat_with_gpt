import { Configuration, CreateChatCompletionRequest, OpenAIApi } from "openai";

// const BASE_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-3.5-turbo";
const DEFAULT_TEMP = 0.7;

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const prepareInputParams = (
  input: IGetSystemResponseInput
): CreateChatCompletionRequest => {
  const model = input.model || DEFAULT_MODEL;
  const temperature = input.temperature || DEFAULT_TEMP;
  return {
    model,
    temperature,
    max_tokens: input.maxTokens,
    messages: [{ role: "user", content: input.message }],
  };
};

export const getChatCompletion = async (
  input: IGetSystemResponseInput
): Promise<string> => {
  if (import.meta.env.DEV && input.overrideDev !== true) {
    await sleep(1000);
    return "I'm a response";
  }

  const configuration = new Configuration({
    apiKey: input.apiKey,
  });
  const openai = new OpenAIApi(configuration);
  const body = prepareInputParams(input);
  const completion = await openai.createChatCompletion(body);
  const response = completion.data;
  console.log(response);
  return response.choices[0].message?.content!;
};

interface IGetSystemResponseInput {
  apiKey: string;
  chatId: string;
  message: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  overrideDev?: boolean;
}
