import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMediaQuery } from "@mui/material";
import Styles from "../notes/NoteDetails.module.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

const NoteDetails = ({ id: propId }) => {
  const { id: paramId } = useParams();
  const id = propId || paramId;
  const [note, setNote] = useState({});
  const [showDeleteConfrm, setDeleteConfrm] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const deleteMsg = "Do you want to Delete this note?";
  const deleteTitle = "Delete Note";
  const queryClient = useQueryClient();
  const location = useLocation();

  useEffect(() => {
    const getNoteDetails = async () => {
      const noteData = await axiosClient.get(`/todo/${id}`);
      setNote(noteData.data);
    };
    getNoteDetails();
  }, [id]);

  const back = () => {
    navigate("/app/notes");
  };

  const closeConfirm = () => setDeleteConfrm(false);
  const openConfirm = () => setDeleteConfrm(true);
  const editNote = () => {
    navigate(`/app/notes/edit`, {
      state: { background: location, component: "edit-note", noteId: id },
    });
  };

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/todo/${id}`);
      closeConfirm();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      back();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <>
      <div className={Styles.notesContainer}>
        <div>
          {isMobile && (
            <div>
              <ArrowBackIcon color="primary" fontSize="small" onClick={back} />
            </div>
          )}
        </div>
        <div className={Styles.contentOuter}>
          <div className={Styles.contentWrapper}>
            <h3>{note.title}</h3>
            <div className={Styles.content}>{note.content}</div>
          </div>
          <div className={Styles.buttonContainer}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={openConfirm}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<EditNoteIcon />}
              onClick={editNote}
            >
              Edit
            </Button>
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
};

export default NoteDetails;
