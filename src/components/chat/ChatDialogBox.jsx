import React from "react";
import Styles from "../chat/Chat.module.css";
import SmartToySharpIcon from "@mui/icons-material/SmartToySharp";
import { Avatar } from "@mui/material";
import Person4Icon from "@mui/icons-material/Person4";

function ChatDialogBox({ role, content }) {
  const isUser = role === "user";
  return (
    <>
      <div
        className={`${Styles.chatDialog_container} ${isUser ? Styles.user : null}`}
      >
        <div>
          {!isUser ? (
            <Avatar sx={{ bgcolor: "#1976d2", width: 20, height: 20 }}>
              <SmartToySharpIcon sx={{ fontSize: 15 }} />
            </Avatar>
          ) : (
            <Avatar sx={{ bgcolor: "#1976d2", width: 20, height: 20 }}>
              <Person4Icon sx={{ fontSize: 15 }} />
            </Avatar>
          )}
        </div>
        <div
          className={`${Styles.chatDialog} ${isUser ? Styles.userBubble : Styles.assistantBubble}`}
        >
          {content ? content : <p>Responding...</p>}
        </div>
      </div>
    </>
  );
}

export default ChatDialogBox;
