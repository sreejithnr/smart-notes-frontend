import React, { useContext, useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import MuiInput from "../../components/common/MuiInput";
import { Fab } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Styles from "../notes/NoteForm.module.css";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const NoteForm = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { title: prefilledTitle, content: prefilledContent } =
    location.state || {};
  const noteId = location.state?.noteId;
  const queryClient = useQueryClient();

  const { data: noteToEdit } = useQuery({
    queryKey: ["note", noteId],
    queryFn: async () => {
      const res = await axiosClient.get(`/todo/${noteId}`);
      return res.data;
    },
    enabled: !!noteId,
  });

  useEffect(() => {
    if (noteToEdit) {
      setFormData({ title: noteToEdit.title, content: noteToEdit.content });
    }
  }, [noteToEdit]);

  useEffect(() => {
    if (prefilledTitle || prefilledContent) {
      setFormData({
        title: prefilledTitle || "",
        content: prefilledContent || "",
      });
    }
  }, [prefilledTitle, prefilledContent]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  const createNote = useMutation({
    mutationFn: async (data) => {
      if (noteId) {
        const res = await axiosClient.put(`/todo/${noteId}`, data);
        return res.data;
      } else {
        const res = await axiosClient.post("/todo", data);
        return res.data;
      }
    },
    onSuccess: () => {
      setFormData({ title: "", content: "" });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createNote.mutate(formData);
    navigate("/app/notes");
  };

  return (
    <div className={Styles.noteForm_container}>
      <h3>{noteId ? "Edit Note" : "Create Note"}</h3>

      <div className={Styles.noteForm_fields}>
        <form onSubmit={handleSubmit}>
          {/* <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={formData.title}
          />
          <textarea
            name="content"
            id="content"
            onChange={handleChange}
            value={formData.content}
          ></textarea> */}

          <MuiInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <MuiInput
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />

          {/* <button type="submit">Create</button> */}
          <div className={Styles.button_wrapper}>
            <Fab
              type="submit" // important: keeps form submission behavior
              color="success"
              aria-label="create"
              size="small"
            >
              <CheckIcon />
            </Fab>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
