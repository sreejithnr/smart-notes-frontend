import React, { useEffect } from "react";
import { Dialog, Slide, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ChatInput from "./ChatInput";
import CancelIcon from "@mui/icons-material/Cancel";
import ChatArea from "./ChatArea";
import { useChat } from "../../context/ChatContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ChatContainer = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { getChats } = useChat();

  useEffect(() => {
    if (open) {
      getChats();
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      fullScreen={false}
      PaperProps={{
        sx: {
          position: "fixed",
          bottom: isMobile ? 0 : 20,
          right: isMobile ? 0 : 20,
          margin: 0,
          width: isMobile ? "100%" : 400,
          height: isMobile ? "80vh" : 500,
          borderRadius: isMobile ? "20px 20px 0 0" : 3,
        },
      }}
    >
      {/* Your Chat UI goes here */}
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* header with close button */}
        <div style={{ padding: 10, borderBottom: "1px solid #eee" }}>
          {/* <button onClick={onClose}>Close</button> */}
          <CancelIcon onClick={onClose} />
        </div>

        {/* chat messages area */}
        <div style={{ flex: 1, overflowY: "auto", padding: 10 }}>
          <ChatArea />
        </div>

        {/* input area */}
        <div style={{ padding: 10 }}>
          <ChatInput />
        </div>
      </div>
    </Dialog>
  );
};

export default ChatContainer;
