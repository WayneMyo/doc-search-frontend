import React from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DocumentUploadPage from "./pages/DocumentUploadPage";
import DocumentSearchPage from "./pages/DocumentSearchPage";

const StyledApp = styled.div`
    width: 90vw;
    padding: 25px;
    margin: 0 auto;
`;

const TitleContainer = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

function App() {
  return (
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
  );
}

export default App;
