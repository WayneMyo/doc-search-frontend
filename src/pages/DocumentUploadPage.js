import React from "react";
import styled from "@emotion/styled";
import LoadingButton from "../components/LoadingButton";
import DocumentTable from "../components/DocumentTable";

const StyledDocumentUploadPage = styled.div`
  
`;

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
            <LoadingButton
                buttonText="Upload"
                onClick={() => console.log("Uploading...")}
            />
            <DocumentTable documents={documents} />
        </StyledDocumentUploadPage>
    );
};

export default DocumentUploadPage;
