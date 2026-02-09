import React, { useState } from "react";
import styles from "../notes/NoteCard.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ConfirmDialog from "../common/ConfirmDialog";
import axiosClient from "../../api/axiosClient";
import { useQueryClient } from "@tanstack/react-query";

function NoteCard({ title, date, note, id }) {
  const navigate = useNavigate();
  const [showDeleteConfrm, setDeleteConfrm] = useState(false);
  const formattedDate = new Date(date).toLocaleDateString("en-GB");
  const location = useLocation();
  const queryClient = useQueryClient();

  const openNote = () => {
    navigate(`/app/notes/${id}`, {
      state: { background: location, component: "note-detail" },
    });
  };

  const openConfirm = () => setDeleteConfrm(true);
  const closeConfirm = () => setDeleteConfrm(false);
  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/todo/${id}`);
      closeConfirm();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };
  const deleteMsg = "Do you want to Delete this note?";
  const deleteTitle = "Delete Note";

  const editNote = () => {
    navigate(`edit`, {
      state: { background: location, component: "edit-note", noteId: id },
    });
  };

  return (
    <>
      <div className={styles.noteCard_wrapper}>
        <div className={styles.noteContent}>
          <div className={styles.noteContent_lhs}>
            <h3 className={styles.note_title}>{title}</h3>
            <p className={styles.note_date}>{formattedDate}</p>
            <p className={styles.note_short}>{note}</p>
            <div className={styles.actionItems}>
              <DeleteIcon color="error" onClick={openConfirm} />
              <EditNoteIcon color="primary" onClick={editNote} />
            </div>
          </div>

          <div className={styles.noteContent_rhs}>
            <ArrowForwardIcon
              color="primary"
              fontSize="large"
              onClick={openNote}
            />
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={showDeleteConfrm}
        onClose={closeConfirm}
        title={deleteTitle}
        message={deleteMsg}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default NoteCard;
