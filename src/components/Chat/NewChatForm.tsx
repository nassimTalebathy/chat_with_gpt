import React, { useState } from "react";

interface NewChatFormProps {
  handleAddChat: (title: string) => void;
}

const NewChatForm: React.FC<NewChatFormProps> = ({ handleAddChat }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    // console.log({ e: e.target });
    e.preventDefault();
    try {
      handleAddChat(title);
      setTitle("");
      setError("");
    } catch (e) {
      setError(`${e}`);
    }
  };

  return (
    <div className="sidebar_item" key={"newchatform_form"}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Enter new chat title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {error && (
          <div className="error" key={"chatform_error"}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default NewChatForm;
