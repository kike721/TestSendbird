import { AppBar, createTheme, ThemeProvider } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF7006',
    }
  }
})

const TopBar = () =>
  <ThemeProvider theme={theme}>
    <AppBar color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#FFF' }}>
          GNP Seguros
        </Typography>
      </Toolbar>
    </AppBar>
  </ThemeProvider>

export default TopBar;