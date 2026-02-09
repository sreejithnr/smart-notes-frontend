import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import NotesIcon from "@mui/icons-material/Description";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box textAlign="center" pt={6} pb={4}>
        <Typography variant="h4" fontWeight="bold">
          Welcome 👋
        </Typography>
        <Typography color="text.secondary">
          What would you like to use today?
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {/* Smart Notes */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardActionArea onClick={() => navigate("/app/notes")}>
              <CardContent sx={{ textAlign: "center", py: 6 }}>
                <NotesIcon sx={{ fontSize: 50 }} color="primary" />
                <Typography variant="h6" mt={2}>
                  Smart Notes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create and manage notes intelligently
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* AI Shopping List */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardActionArea onClick={() => navigate("/app/shopping")}>
              <CardContent sx={{ textAlign: "center", py: 6 }}>
                <ShoppingCartIcon sx={{ fontSize: 50 }} color="success" />
                <Typography variant="h6" mt={2}>
                  AI Shopping List
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create shopping lists using voice & AI
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
