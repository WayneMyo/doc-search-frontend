import React from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import AnimatedBg from "./components/AnimatedBg";
import DocumentUploadPage from "./pages/DocumentUploadPage";
import DocumentSearchPage from "./pages/DocumentSearchPage";

const ParentContainer = styled.div`
    position: relative;
`;

const StyledApp = styled.div`
    position: relative;
    width: 90vw;
    height: 95vh;
    padding: 25px;
    margin: 0 auto;
`;

const TitleContainer = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

function App() {
  return (
    <ParentContainer>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right', }}>
        <AnimatedBg particleCount={35} />
        <Router>
          <StyledApp>
            <TitleContainer>
              <Typography variant="h4" component="h1" gutterBottom>
                Doc Search
              </Typography>
            </TitleContainer>
            <Routes>
              <Route path="/" element={<DocumentSearchPage />} />
              <Route path="/upload" element={<DocumentUploadPage />} />
            </Routes>
          </StyledApp>
        </Router>
      </SnackbarProvider>
    </ParentContainer>
  );
}

export default App;
