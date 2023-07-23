import { useContext, useState } from "react";
import Message from "./Message";
import { IMessage, IMessageRole } from "./message.interface";
import { IChat } from "./chat.interface";
import NewMessageForm from "./NewMessageForm";
import { saveChat } from "../../utils/db";
import { getChatCompletion } from "../../utils/api";
import ChatLoading from "./ChatLoader";
import { AuthenticationContext } from "../../auth/authentication.context";

interface IChatParams {
  messages: IMessage[];
  currentChat: IChat | undefined;
  setMessages: (messages: IMessage[]) => void;
  modelName: string;
}

const Chat = (input: IChatParams) => {
  const { currentChat, messages, setMessages } = input;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLocal, user } = useContext(AuthenticationContext);

  const handleChatMessageSubmit = async (message: string) => {
    setError("");
    setLoading(false);
    if (!currentChat) {
      setError("No current chat");
      console.error("No current chat");
      return;
    }
    if (!user) {
      setError("No user");
      console.error("No user");
      return;
    }
    // run process
    try {
      // add new user message
      currentChat.addMesssage({ message, role: IMessageRole.USER });

      // get response from ChatGPT
      setLoading(true);
      const chatCompletion = await getChatCompletion({
        chatId: currentChat.id,
        message,
        apiKey: user?.apiKey,
        model: input.modelName,
        // overrideDev: isLocal,
      });

      currentChat.addMesssage({
        message: chatCompletion,
        role: IMessageRole.SYSTEM,
      });

      // save messages
      const newMessages = currentChat.messages.slice(0); // create a reference to a new array (React BUG)
      setMessages(newMessages);

      // save chat
      saveChat(currentChat).then(() => {
        setMessages(newMessages);
        setLoading(false);
      });
    } catch (e) {
      setError(`${e}`);
      setLoading(false);
      console.error(e);
    }
  };

  if (!currentChat) {
    return (
      <div style={{ width: "100%" }}>
        <h3 style={{ textAlign: "center" }}>Chat Room</h3>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <h3 style={{ textAlign: "center" }}>Chat Room: {currentChat.title}</h3>
      <br />
      <div className="messages" style={{ alignContent: "start" }}>
        {messages?.length > 0 &&
          messages
            .sort((a, b) => (a.timestamp.isBefore(b.timestamp) ? -1 : 1))
            .map((message, index) => {
              // console.log({ index });
              return (
                <Message key={message.id} index={index} message={message} />
              );
            })}
      </div>
      {loading && <ChatLoading />}
      {/* add new message */}
      {<NewMessageForm onSubmit={handleChatMessageSubmit} />}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
    </div>
  );
};

export default Chat;
