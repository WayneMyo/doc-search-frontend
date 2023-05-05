import React, { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "@emotion/styled";

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)`
    margin: 20px;
`;

const LoadingButton = ({ buttonText, onClick, color, size }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        await onClick();
        setIsLoading(false);
    };

    return (
        <ButtonWrapper>
            <StyledButton
                onClick={handleClick}
                color={color || "primary"}
                size={size || "medium"}
                disabled={isLoading}
            >
                {buttonText}
            </StyledButton>
            {isLoading && (
                <CircularProgress size={24} style={{ marginLeft: "8px" }} />
            )}
        </ButtonWrapper>
    );
};

export default LoadingButton;
