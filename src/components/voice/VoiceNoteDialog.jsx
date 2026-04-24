import React, { useEffect, useState } from "react";
import { Dialog, Slide, useMediaQuery, Fab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import styles from "./VoiceNoteDialog.module.css";
import MicIcon from "@mui/icons-material/Mic";
import axiosClient from "../../api/axiosClient";
import { useLocation, useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VoiceNoteDialog = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (status === "drafting" && result) {
      navigate("new", {
        state: {
          background: location,
          component: "new-note",
          title: result.title,
          content: result.content,
        },
      });
      onClose();
      setStatus("idle");
    }
  }, [status, result]);

  const startRecording = async () => {
    setStatus("recording");
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setStream(stream);
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);
    let localChunks = [];

    recorder.ondataavailable = (e) => {
      localChunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(localChunks, { type: "audio/webm" });
      handleAudioComplete(blob);
    };

    recorder.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    setStatus("processing");

    if (mediaRecorder) {
      mediaRecorder.stop();
    }

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
  };

  const handleAudioComplete = async (blob) => {
    try {
      setStatus("processing");
      const formData = new FormData();
      formData.append("audio", blob);
      formData.append("type", "note");
      const res = await axiosClient.post("/ai/voice", formData);
      const data = res.data;
      setResult(data.data); // store text
      setStatus("drafting"); // move UI to preview
    } catch (err) {
      console.error("Error:", err);
      setStatus("error");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      PaperProps={{
        sx: isMobile
          ? {
              position: "fixed",
              bottom: 0,
              right: 0,
              width: "100%",
              borderRadius: "20px 20px 0 0",
              margin: "0px",
            }
          : {
              // desktop/web → let MUI center it
              width: 400,
              borderRadius: 3,
            },
      }}
    >
      <div>
        {/* Header */}
        <div className={styles.cancel_area}>
          <CancelIcon onClick={onClose} />
        </div>

        <div className={styles.voice_dialog_content}>
          {/* IDLE / RECORDING */}
          {(status === "idle" ||
            status === "recording" ||
            status === "error") && (
            <>
              <Fab
                color={isRecording ? "secondary" : "primary"}
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onTouchStart={startRecording}
                onTouchEnd={stopRecording}
              >
                <MicIcon />
              </Fab>
            </>
          )}

          <p>
            {status === "idle" && "Hold to Speak..."}
            {status === "recording" && "Listening..."}
            {status === "processing" && "Analyzing voice..."}
            {status === "drafting" && "Drafting note..."}
            {status === "error" && "Something went wrong, Try again."}
          </p>
        </div>
      </div>
    </Dialog>
  );
};

export default VoiceNoteDialog;
