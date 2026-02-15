import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery, Dialog } from "@mui/material";
import NoteDetails from "../pages/notes/NoteDetails";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import NoteForm from "../pages/notes/NoteForm";
import AppTopBar from "../components/common/AppTopBar";

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:600px)");

  let dialogComponent = null;

  const background = location.state?.background;
  if (location.state?.component == "note-detail") {
    dialogComponent = <NoteDetails />;
  } else if (location.state?.component == "new-note") {
    dialogComponent = <NoteForm />;
  } else if (location.state?.component == "edit-note") {
    dialogComponent = <NoteForm />;
  }
  const back = () => {
    navigate("/app/notes");
  };

  return (
    <>
      <AppTopBar />
      {/* MAIN CONTENT */}
      <Outlet />

      {/* MODAL LAYER (desktop only) */}
      {background && !isMobile && (
        <Dialog
          open
          fullWidth
          maxWidth="xs"
          onClose={back}
          slotProps={{
            paper: {
              sx: {
                position: "relative",
                overflow: "visible",
              },
            },
          }}
        >
          {/* ❌ outside but attached */}
          <IconButton
            onClick={back}
            sx={{
              position: "absolute",
              top: -16,
              right: -16,
              backgroundColor: "#fff",
              boxShadow: 3,
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {dialogComponent}
        </Dialog>
      )}
    </>
  );
};

export default AppLayout;
