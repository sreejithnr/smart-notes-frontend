import { Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import NotesList from "../../components/notes/NotesList";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddIcon from "@mui/icons-material/Add";
import MicIcon from "@mui/icons-material/Mic";
import EditIcon from "@mui/icons-material/Edit";
import SearchBox from "../../components/common/SearchBox";
import { useState } from "react";
import VoiceNoteDialog from "../../components/voice/VoiceNoteDialog";

const NotesDashboard = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isNoteOpen = useMatch("/app/notes/:id");
  const location = useLocation();
  const navigate = useNavigate();
  const [showVoice, setShowVoice] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const shouldShowList = !isMobile || !isNoteOpen;

  const style = { display: "flex", justifyContent: "flex-end" };

  return (
    <>
      {shouldShowList && (
        <div style={!isMobile ? style : null}>
          <SearchBox value={searchTerm} onSearch={setSearchTerm} />
        </div>
      )}
      <div>
        {shouldShowList && <NotesList searchTerm={searchTerm} />}
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

          <SpeedDialAction
            icon={<MicIcon />}
            onClick={() => setShowVoice(true)}
          />
        </SpeedDial>
      </div>

      <VoiceNoteDialog open={showVoice} onClose={() => setShowVoice(false)} />
    </>
  );
};

export default NotesDashboard;
