import React from "react";
import styles from "../notes/NoteCard.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

function NoteCard() {
  return (
    <>
      <div className={styles.noteCard_wrapper}>
        <div className={styles.noteContent}>
          <div className={styles.noteContent_lhs}>
            <h3 className={styles.note_title}>Football Match</h3>
            <p className={styles.note_date}>06/10/1997</p>
            <p className={styles.note_short}>
              Football match on456456456erterterterterte
            </p>
            <div className={styles.actionItems}>
              <DeleteIcon color="error" />
              <EditNoteIcon color="primary" />
            </div>
          </div>

          <div className={styles.noteContent_rhs}>
            <ArrowForwardIcon color="primary" fontSize="large" />
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteCard;
