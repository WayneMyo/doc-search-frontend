import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Toolbar, Box, Button } from "@mui/material";
import LoadingButton from "../components/LoadingButton";
import DocumentTable from "../components/DocumentTable";

const StyledDocumentUploadPage = styled.div``;

const DocumentUploadPage = () => {
    const documents = [
        {
            id: 1,
            title: "Document 1",
            description: "This is document 1",
        },
        {
            id: 2,
            title: "Document 2",
            description: "This is document 2",
        },
    ];

    return (
        <StyledDocumentUploadPage>
            <DocumentTable
                documents={documents}
                emptyMessage="No documents uploaded."
                toolbar={
                    <Toolbar>
                        <Box display="flex" flexGrow={1}></Box>
                        <LoadingButton
                            buttonText="Upload"
                            onClick={() => console.log("Uploading...")}
                        />
                        <Link to="/">
                            <Button>Back</Button>
                        </Link>
                    </Toolbar>
                }
            />
        </StyledDocumentUploadPage>
    );
};

export default DocumentUploadPage;
