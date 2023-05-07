import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Toolbar, Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import SearchBox from "../components/SearchBox";
import LoadingButton from "../components/LoadingButton";
import DocumentTable from "../components/DocumentTable";
import { searchDocuments, downloadDocument } from "../api";

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

            // if (searchResults.summary) {
            //     setSearchResSummary(searchResults.summary);
            // }
        }
    };

    const handleDownload = async (filename) => {
        const response = await downloadDocument(filename);

        if (response) {
            enqueueSnackbar(`Downloading ${filename}`, { variant: "success" });

            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            enqueueSnackbar(`Error downloading ${filename}`, { variant: "error" });
        }
    };

    const columns = [
        { id: "id", label: "ID" },
        { id: "filename", label: "Filename" },
        { id: "actions", label: "Actions" },
    ];

    const documentsWithDownloadButton = documents.map((doc) => ({
        ...doc,
        actions: (
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleDownload(doc.filename)}
            >
                Download
            </Button>
        ),
    }));

    return (
        <StyledDocumentSearchPage>
            <DocumentTable
                documents={documentsWithDownloadButton}
                summary={searchResSummary}
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
