import React, { useState, useEffect, useContext } from "react";

import Sidebar from "../components/SideBar/SideBar";
import { IChat } from "../components/Chat/chat.interface";
import { IMessage } from "../components/Chat/message.interface";
import { getInitialChats, saveChat } from "../utils/db";
import Chat from "../components/Chat/Chat";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../auth/authentication.context";

const ChatRoom: React.FC = () => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentChat, setCurrentChat] = useState<IChat | undefined>(undefined);
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
    return () => {
      // console.log("fetching initial chats...");
      getInitialChats().then((result) => setChats(result));
    };
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
      />
      <div style={{ display: "flex", width: "100%" }}>
        <Chat
          setMessages={setMessages}
          messages={messages}
          currentChat={currentChat}
        />
      </div>
    </div>
  );
};

export default ChatRoom;
