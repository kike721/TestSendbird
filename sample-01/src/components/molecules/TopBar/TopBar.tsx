import { AppBar, createTheme, ThemeProvider } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#d23a3a',
    }
  }
})

const TopBar = () =>
  <ThemeProvider theme={theme}>
  <AppBar color="primary">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Colgate
      </Typography>
    </Toolbar>
  </AppBar>
  </ThemeProvider>

export default TopBar;