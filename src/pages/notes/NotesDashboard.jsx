import { Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import NotesList from "../../components/notes/NotesList";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddIcon from "@mui/icons-material/Add";
import MicIcon from "@mui/icons-material/Mic";
import EditIcon from "@mui/icons-material/Edit";

const NotesDashboard = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isNoteOpen = useMatch("/app/notes/:id");
  const location = useLocation();
  const navigate = useNavigate();

  const shouldShowList = !isMobile || !isNoteOpen;
  return (
    <>
      <div>NotesDashboard</div>

      <div>
        {shouldShowList && <NotesList />}
        {isMobile && <Outlet />}
      </div>
      <div>
        <SpeedDial
          ariaLabel="Create note actions"
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
          }}
          icon={<AddIcon />}
        >
          <SpeedDialAction
            icon={<EditIcon />}
            onClick={() =>
              navigate("new", {
                state: { background: location, component: "new-note" },
              })
            }
          />

          <SpeedDialAction icon={<MicIcon />} />
        </SpeedDial>
      </div>
    </>
  );
};

export default NotesDashboard;
