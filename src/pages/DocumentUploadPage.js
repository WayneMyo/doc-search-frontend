import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Toolbar, Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import FileSelector from "../components/FileSelector";
import LoadingButton from "../components/LoadingButton";
import DocumentTable from "../components/DocumentTable";
import { getDocuments, uploadDocument, deleteAllDocuments, downloadDocument } from "../api";

const StyledDocumentUploadPage = styled.div``;

const DocumentUploadPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [documents, setDocuments] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedDocuments = await getDocuments();
            setDocuments(fetchedDocuments);
        };
        fetchData();
    }, []);

    const handleFileChange = (file) => {
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            enqueueSnackbar("Please select a file to upload", { variant: "error" });
            return;
        }

        enqueueSnackbar(`Uploading ${selectedFile.name}...`, { variant: "info" });
        const response = await uploadDocument(selectedFile);

        if (response) {
            enqueueSnackbar(`${selectedFile.name} uploaded successfully`, { variant: "success" });
            setDocuments([...documents, response]);
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

    const handleDelete = async () => {
        enqueueSnackbar(`Deleting all documents...`, { variant: "info" });
        const response = await deleteAllDocuments();

        if (response) {
            enqueueSnackbar(`All documents deleted successfully`, { variant: "success" });
            setDocuments([]);
        } else {
            enqueueSnackbar(`Error deleting all documents`, { variant: "error" });
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
        <StyledDocumentUploadPage>
            <DocumentTable
                documents={documentsWithDownloadButton}
                emptyMessage="No documents uploaded."
                columns={columns}
                toolbar={
                    <Toolbar>
                        <Box display="flex" flexGrow={1}><Button variant="contained" color="error" onClick={handleDelete}>Purge Docs</Button></Box>
                        <FileSelector onFileChange={handleFileChange} />
                        <LoadingButton buttonText="Upload" onClick={handleUpload} />
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
