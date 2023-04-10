import "./sidebar.css";
import { IChat } from "../Chat/chat.interface";
import NewChatForm from "../Chat/NewChatForm";
import { Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { deleteChat } from "../../utils/db";

interface SidebarProps {
  chats: IChat[];
  setChats: (chats: IChat[]) => void;
  setCurrentChatId: (id?: string) => void;
  currentChatId: string | undefined;
  handleAddChat: (title: string) => void;
}

const Sidebar = <T extends SidebarProps>(props: T) => {
  const { chats, setChats, setCurrentChatId, currentChatId, handleAddChat } =
    props;

  const handleChatClick = (chat: IChat) => {
    if (chat.id !== currentChatId) {
      setCurrentChatId(chat.id);
    } else {
      setCurrentChatId(undefined);
    }
  };

  const handleIconClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!currentChatId) {
      return;
    }
    deleteChat(currentChatId)
      .then(() => {
        alert(`Chat ${currentChatId} deleted`);
        const newChats = chats.slice(0).filter((x) => x.id !== currentChatId);
        setChats(newChats);
        setCurrentChatId(undefined);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className="sidebar">
      <br />
      <div className="sidebar_logo" key={"logo"}>
        Chats
      </div>
      {chats
        .sort((a, b) => (a.timestamp.isBefore(b.timestamp) ? -1 : 1))
        .map((chat, index) => {
          const isActive = chat.id === currentChatId;
          const backgroundColor = isActive ? "white" : undefined;
          return (
            <div key={chat.id} style={{ backgroundColor, padding: "0.3rem" }}>
              <span
                className="sidebar_item"
                onClick={() => handleChatClick(chat)}
              >
                {chat.title}
              </span>
              {isActive && (
                <Space
                  style={{
                    paddingRight: "0.5rem",
                    color: "red",
                    float: "right",
                  }}
                  onClick={handleIconClick}
                >
                  <CloseOutlined />
                </Space>
              )}
            </div>
          );
        })}
      {/* Create new chat */}
      <NewChatForm handleAddChat={handleAddChat} />
    </div>
  );
};

export default Sidebar;
