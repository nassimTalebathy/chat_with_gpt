import moment, { Moment } from "moment";
import { v4 as uuidv4 } from "uuid";
import { assertTrue } from "../../utils/validation";

export interface IMessageInput {
  id?: string;
  role: IMessageRole;
  message: string;
  timestamp?: Moment;
}

export enum IMessageRole {
  USER = "USER",
  SYSTEM = "SYSTEM",
}

export class IMessage {
  id: string;
  role: IMessageRole | string;
  message: string;
  timestamp: Moment;

  constructor(input: IMessageInput) {
    this.validateInput(input);
    this.id = input.id || uuidv4();
    this.role = input.role;
    this.message = input.message;
    this.timestamp = moment(input.timestamp) || moment();
  }

  private validateInput(input: IMessageInput) {
    const { role, message, timestamp } = input;
    assertTrue(Object.values(IMessageRole).includes(role), "invalid role");
    assertTrue(message.trim() !== "", "message cannot be empty");
    timestamp &&
      assertTrue(moment(timestamp).isValid(), "timestamp is not valid");
  }

  static fromJson(input: IMessageInput) {
    input.role =
      input.role === IMessageRole.USER
        ? IMessageRole.USER
        : IMessageRole.SYSTEM;
    return new IMessage(input);
  }
}
