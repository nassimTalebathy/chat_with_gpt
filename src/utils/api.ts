import {
  Configuration,
  CreateChatCompletionRequest,
  OpenAIApi,
  Model as OpenAIModel,
} from "openai";

// const BASE_URL = "https://api.openai.com/v1/chat/completions";
export const DEFAULT_MODEL_NAME = "gpt-3.5-turbo";
const DEFAULT_TEMP = 0.7;

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const prepareInputParams = (
  input: IGetSystemResponseInput
): CreateChatCompletionRequest => {
  const model = input.model || DEFAULT_MODEL_NAME;
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

export const getAvailableModels = async (
  input: IOpenAIConfigInput
): Promise<ModelInfo[]> => {
  if (import.meta.env.DEV && input.overrideDev !== true) {
    await sleep(1000);
    const fakeModel: ModelInfo = {
      id: DEFAULT_MODEL_NAME,
      object: "o",
      owned_by: "me",
      created: new Date().getTime(),
    };
    return [fakeModel];
  }
  const configuration = new Configuration({
    apiKey: input.apiKey,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.listModels();
  // console.log(response.data);
  return response.data.data;
};

interface IOpenAIConfigInput {
  apiKey: string;
  overrideDev?: boolean;
}

interface IGetSystemResponseInput extends IOpenAIConfigInput {
  chatId: string;
  message: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ModelInfo extends OpenAIModel {}
