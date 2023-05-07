import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Toolbar, Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import SearchBox from "../components/SearchBox";
import LoadingButton from "../components/LoadingButton";
import DocumentTable from "../components/DocumentTable";
import { searchDocuments } from "../api";

const StyledDocumentSearchPage = styled.div``;

const DocumentSearchPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [searchResSummary, setSearchResSummary] = useState("");
    const [documents, setDocuments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (value) => {
        setSearchQuery(value);
    };

    const handleSearch = async () => {
        if (!searchQuery) {
            enqueueSnackbar("Please enter a search query", { variant: "error" });
            return;
        }

        enqueueSnackbar("Searching...", { variant: "info" });
        const searchResults = await searchDocuments(searchQuery);
        if (searchResults) {
            enqueueSnackbar("Search complete", { variant: "success" });
            if (searchResults.documents.length > 0) {
                setDocuments(searchResults.documents);
            }

            if (searchResults.summary) {
                setSearchResSummary(searchResults.summary);
            }
        }
    };

    // Define the columns for the DocumentTable component
    const columns = [
        { id: "id", label: "ID" },
        { id: "filename", label: "Filename" },
        { id: "s3_url", label: "Actions" },
    ];

    return (
        <StyledDocumentSearchPage>
            <DocumentTable
                documents={documents}
                emptyMessage="No documents found."
                columns={columns}
                toolbar={
                    <Toolbar>
                        <Box display="flex" flexGrow={1}>
                            <Box display="flex" flexGrow={1} justifyContent="flex-end">
                                <SearchBox
                                    placeholder="Search documents"
                                    onChange={handleSearchChange}
                                />
                            </Box>
                            <LoadingButton buttonText="Search" onClick={handleSearch} />
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

export default DocumentSearchPage;
