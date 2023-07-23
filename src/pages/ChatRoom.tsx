import React, { useState, useEffect, useContext } from "react";

import Sidebar from "../components/SideBar/SideBar";
import { IChat } from "../components/Chat/chat.interface";
import { IMessage } from "../components/Chat/message.interface";
import { getAllChats, saveChat } from "../utils/db";
import Chat from "../components/Chat/Chat";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../auth/authentication.context";
import { DEFAULT_MODEL_NAME } from "../utils/api";

const ChatRoom: React.FC = () => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentChat, setCurrentChat] = useState<IChat | undefined>(undefined);
  const [modelName, setModelName] = useState<string>(DEFAULT_MODEL_NAME);

  const setCurrentChatId = (id?: string) => {
    if (!id) {
      setCurrentChat(undefined);
    } else {
      const newChat = chats.find((c) => c.id === id);
      newChat && setCurrentChat(newChat);
    }
  };

  const { isAuthenticated } = useContext(AuthenticationContext);

  // get initial chats
  useEffect(() => {
    console.log("fetching initial chats...");
    getAllChats()
      .then((result) => {
        setChats(result);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  // change messages based on chatId
  useEffect(() => {
    if (!currentChat) {
      setMessages([]);
      return;
    } else {
      setMessages(currentChat?.messages || []);
    }
  }, [currentChat]);

  const handleAddChat = async (title: string) => {
    console.log("adding a new chat");
    const newChat = new IChat({ title });
    saveChat(newChat);
    setChats([...chats, newChat]);
    setCurrentChat(newChat);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return (
    <div style={{ maxHeight: "100%", height: "1000px", display: "flex" }}>
      <Sidebar
        chats={chats}
        setChats={setChats}
        currentChatId={currentChat?.id}
        setCurrentChatId={setCurrentChatId}
        handleAddChat={handleAddChat}
        setModelName={setModelName}
      />
      <div style={{ display: "flex", width: "100%" }}>
        <Chat
          setMessages={setMessages}
          messages={messages}
          currentChat={currentChat}
          modelName={modelName}
        />
      </div>
    </div>
  );
};

export default ChatRoom;
