import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DocumentUploadPage from "./pages/DocumentUploadPage";
import DocumentSearchPage from "./pages/DocumentSearchPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<DocumentSearchPage />} />
          <Route path="/upload" element={<DocumentUploadPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
