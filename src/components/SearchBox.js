import React from "react";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";

const StyledTextField = styled(TextField)`
    width: 200px;
    margin: 20px;
    transition: width 0.5s ease-in-out;

    &:focus-within {
        width: 100%;
    }
`;

const SearchBox = ({ placeholder, onChange, value }) => {
    return (
        <StyledTextField
            variant="outlined"
            label={placeholder || "Search"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default SearchBox;
