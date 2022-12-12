import React, { useMemo } from "react";
import { CssBaseline, ThemeOptions, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/app-router/app-router";

function App() {
  const mode = useSelector((state: RootState) => state.global?.mode);
  const theme = useMemo(() => {
    // @ts-ignore
    return createTheme(themeSettings<ThemeOptions>(mode));
  }, [mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
