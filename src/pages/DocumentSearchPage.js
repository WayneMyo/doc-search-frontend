import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Toolbar, Box, Button } from "@mui/material";
import SearchBox from "../components/SearchBox";
import LoadingButton from "../components/LoadingButton";
import DocumentTable from "../components/DocumentTable";

const StyledDocumentSearchPage = styled.div`

`;

const DocumentSearchPage = () => {
    const documents = [];

    return (
        <StyledDocumentSearchPage>
            <DocumentTable
                documents={documents}
                emptyMessage="No documents found."
                toolbar={
                    <Toolbar>
                        <Box display="flex" flexGrow={1}>
                            <Box display="flex" flexGrow={1} justifyContent="flex-end">
                                <SearchBox
                                    placeholder="Search documents"
                                    onChange={(value) => console.log(value)}
                                />
                            </Box>
                            <LoadingButton
                                buttonText="Search"
                                onClick={() => console.log("Searching...")}
                            />
                        </Box>
                        <Link to="/upload">
                            <Button>Upload Documents</Button>
                        </Link>
                    </Toolbar>
                }
            />
        </StyledDocumentSearchPage>
    );
};

export default DocumentSearchPage
