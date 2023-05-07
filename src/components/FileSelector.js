import React, { useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import styled from "@emotion/styled";

const StyledInput = styled(Input)`
  display: none;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  padding: 6px 8px;
  max-width: 500px;
  width: 100%;
`;


const FileInput = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  margin-left: 8px;
  &:focus {
    outline: none;
  }
`;

const FileSelector = ({ onFileChange, accept = "*/*" }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (onFileChange) {
      onFileChange(file);
    }
  };

  return (
    <div>
      <StyledInput
        accept={accept}
        id="raised-button-file"
        type="file"
        onChange={handleFileChange}
        inputProps={{
          tabIndex: -1,
        }}
      />
      <InputContainer>
        <FileInput
          type="text"
          readOnly
          value={selectedFile ? selectedFile.name : ""}
          placeholder="Select a file to upload"
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span" size="small">
            Browse
          </Button>
        </label>
      </InputContainer>
    </div>
  );
};

export default FileSelector;
