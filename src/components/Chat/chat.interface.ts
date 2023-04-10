import { v4 as uuidv4 } from "uuid";
import { IMessage, IMessageInput } from "./message.interface";
import moment, { Moment } from "moment";
import { assertTrue } from "../../utils/validation";

interface IChatInput {
  id?: string;
  title: string;
  messages?: any[];
  timestamp?: Moment;
}

export class IChat {
  id: string;
  title: string;
  messages: IMessage[];
  timestamp: Moment;

  constructor(input: IChatInput) {
    this.validateInput(input);
    this.id = input.id || uuidv4();
    this.title = input.title;
    this.messages = (input.messages || []).map((msg) => IMessage.fromJson(msg));
    this.timestamp = moment(input.timestamp) || moment();
  }

  private validateInput(input: IChatInput) {
    const { title, messages, timestamp } = input;
    messages &&
      assertTrue(Array.isArray(messages), "messages must be an array");
    assertTrue(title.trim() !== "", "title must not be empty");
    timestamp &&
      assertTrue(moment(timestamp).isValid(), "timestamp is not valid");
  }

  addMesssage(messageInput: IMessageInput) {
    const message = new IMessage(messageInput);
    this.messages.push(message);
  }
}
