import React from "react";
import { IMessage } from "./message.interface";
import "./Message.css";

interface MessageProps {
  message: IMessage;
  index: number;
}

const Message: React.FC<MessageProps> = ({ message, index }) => {
  const { role } = message;
  const className = `message_${role.toLowerCase()}`;
  // console.log({ message, index });

  return (
    <div key={message.id + "_2"} className={className}>
      {message.role} @ {message.timestamp.toLocaleString()}: {message.message}
    </div>
  );
};

export default Message;
