import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { useChat } from "../../context/ChatContext";

function ChatInput() {
  const [text, setText] = useState("");
  const { sendMessage, isStreaming } = useChat();

  const handleSend = () => {
    if (!text.trim() || isStreaming) return;
    sendMessage(text);
    setText("");
  };

  return (
    <TextField
      fullWidth
      multiline
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Type a message..."
      variant="outlined"
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSend} disabled={isStreaming}>
              <SendIcon sx={{ color: "blue" }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default ChatInput;
