// CircularLoader.jsx
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

const GradientCircularProgress = styled(CircularProgress)(() => ({
  color: "transparent", // hide default solid color
  "& .MuiCircularProgress-circle": {
    stroke: "url(#gradient)", // apply gradient stroke
  },
}));

const CircularLoader = ({ size = 40, thickness = 4 }) => {
  return (
    <div>
      {/* Define gradient once */}
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6ec4" />
            <stop offset="100%" stopColor="#7873f5" />
          </linearGradient>
        </defs>
      </svg>
      <GradientCircularProgress size={size} thickness={thickness} />
    </div>
  );
};

export default CircularLoader;
