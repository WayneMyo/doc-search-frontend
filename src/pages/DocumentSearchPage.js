import React from "react";
import styled from "@emotion/styled";
import SearchBox from "../components/SearchBox";
import LoadingButton from "../components/LoadingButton";
import DocumentTable from "../components/DocumentTable";

const StyledDocumentSearchPage = styled.div`
  
`;

const DocumentSearchPage = () => {
    const documents = [];

    return (
        <StyledDocumentSearchPage>
            <SearchBox
                placeholder="Search documents"
                onChange={(value) => console.log(value)}
            />
            <LoadingButton
                buttonText="Search"
                onClick={() => console.log("Searching...")}
            />
            <LoadingButton>Search</LoadingButton>
            <DocumentTable />
        </StyledDocumentSearchPage>
    );
};

export default DocumentSearchPage;
