import React from "react";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";

const StyledTextField = styled(TextField)`
  
`;

const SearchBox = ({ placeholder, onChange, value, ...otherProps }) => {
    return (
        <StyledTextField
            {...otherProps}
            variant="outlined"
            label={placeholder || "Search"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default SearchBox;
