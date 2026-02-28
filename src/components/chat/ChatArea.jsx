import React, { useEffect, useRef } from "react";
import ChatDialogBox from "./ChatDialogBox";
import Styles from "../chat/Chat.module.css";
import { useChat } from "../../context/ChatContext";

function ChatArea() {
  const { messages } = useChat();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={Styles.chat_container}>
      {messages.map((msg, index) => {
        return (
          <ChatDialogBox key={index} role={msg.role} content={msg.content} />
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}

export default ChatArea;
