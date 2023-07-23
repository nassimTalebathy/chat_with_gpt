import moment from "moment";
import { IChat } from "../components/Chat/chat.interface";
import { IUser } from "../auth/authentication.context";
import { ModelInfo } from "./api";

export const CURRENT_USER_KEY = "currentUser";
export const MODEL_NAMES_KEY = "modelNames";

export const getAllChats = async () => {
  const ignoreKeys = [CURRENT_USER_KEY, MODEL_NAMES_KEY, "debug"];
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  let arr: IChat[] = [];
  for (var i = 0, len = localStorage.length; i < len; ++i) {
    const key = localStorage.key(i);
    const isUUID = uuidPattern.test(key!);
    if (ignoreKeys.includes(key!) || isUUID === false) {
      continue;
    }
    const val = localStorage.getItem(key as string);
    const value = JSON.parse(val!);
    const chat = await getChat(key as string);
    // console.log({ i, key, value });
    arr.push(chat);
  }
  arr = await Promise.all(arr);

  return arr;
};

export const getInitialUser = async (): Promise<IUser | undefined> => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  if (!user) {
    return;
  }
  return JSON.parse(user) as IUser;
};

export const getModelsInfo = async (): Promise<ModelInfo[]> => {
  const models = localStorage.getItem(MODEL_NAMES_KEY);
  if (!models) {
    return [];
  }
  return JSON.parse(models);
};

export const saveModelsInfo = async (models: ModelInfo[]) => {
  console.log(`saving ${models.length} models e.g. ${models[0].id}`);
  localStorage.setItem(MODEL_NAMES_KEY, JSON.stringify(models));
  return;
};

export const saveUser = async (user: IUser) => {
  console.log("saving user " + user.apiKey);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return;
};

export const clearUser = async (user: IUser) => {
  console.log("removing user: " + user.apiKey);
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Fetch chat and messages for a specific chat room
export const getChat = async (chatId: string): Promise<IChat> => {
  const jsonValue = localStorage.getItem(chatId);
  if (!jsonValue) {
    throw new Error("No chat for given id " + chatId);
  }
  const value = JSON.parse(jsonValue!);
  value.timestamp = moment(value.timestamp);
  return new IChat(value);
  // const response = await fetch(`${BASE_URL}/chats/${chatId}/messages`);
  // if (!response.ok) {
  //   throw new Error("Failed to fetch chat messages");
  // }
  // const data = await response.json();
  // return data.messages;
};

export const saveChat = async (chat: IChat) => {
  const saveFormat = {
    id: chat.id,
    messages: chat.messages,
    title: chat.title,
    timestamp: chat.timestamp,
  };

  localStorage.setItem(chat.id, JSON.stringify(saveFormat));
};

export const deleteChat = async (chatId: string) => {
  localStorage.removeItem(chatId);
};
