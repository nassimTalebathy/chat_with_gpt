import React, { useState } from "react";

interface NewMessageFormProps {
  onSubmit: (message: string) => void;
}

const NewMessageForm: React.FC<NewMessageFormProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSubmit(message);
      setMessage("");
      setValidationError("");
    } else {
      setValidationError("Chat message cannot be empty");
    }
  };

  return (
    <div key={"message_form"} style={{ textAlign: "left", margin: "1rem" }}>
      <form onSubmit={handleSubmit}>
        <textarea
          required
          style={{ width: "80%" }}
          rows={3}
          wrap="true"
          placeholder="Enter new chat message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <br />
        <input type="submit" value="Submit" />
        {validationError !== "" && (
          <div
            className="error"
            key={"newchatform_error"}
            style={{ color: "red" }}
          >
            {validationError}
          </div>
        )}
      </form>
    </div>
  );
};

export default NewMessageForm;
