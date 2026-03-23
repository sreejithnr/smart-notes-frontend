import React, { useEffect, useRef, useState } from "react";
import ChatDialogBox from "./ChatDialogBox";
import Styles from "../chat/Chat.module.css";
import { useChat } from "../../context/ChatContext";
import Fab from "@mui/material/Fab";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function ChatArea() {
  const { messages } = useChat();
  const bottomRef = useRef(null);
  const containerRef = useRef(null);
  const [showScrollDownBtn, setScrollDownBtn] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const threshold = 100;

      const isAtBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        threshold;

      setScrollDownBtn(!isAtBottom);
    };

    // 👇 RUN ONCE INITIALLY
    handleScroll();

    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, [messages]);

  return (
    <div className={Styles.chat_container} ref={containerRef}>
      {messages.map((msg, index) => {
        return (
          <ChatDialogBox key={index} role={msg.role} content={msg.content} />
        );
      })}
      {showScrollDownBtn && (
        <div id="scrollDown" className="scrollDown">
          <Fab
            onClick={(e) => {
              bottomRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            sx={{
              position: "absolute",
              bottom: 80,
              right: 5,
              width: "40px",
              height: "40px",
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
              },
            }}
          >
            <ArrowDownwardIcon />
          </Fab>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}

export default ChatArea;
