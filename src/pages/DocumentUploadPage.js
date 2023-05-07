import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Toolbar, Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import FileSelector from "../components/FileSelector";
import LoadingButton from "../components/LoadingButton";
import DocumentTable from "../components/DocumentTable";
import { getDocuments, uploadDocument } from "../api";

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

        if (response.status) {
            enqueueSnackbar(`${selectedFile.name} uploaded successfully`, { variant: "success" });
            setDocuments([...documents, response]);
        }
    };

    const columns = [
        { id: "id", label: "ID" },
        { id: "filename", label: "Filename" },
        { id: "s3_url", label: "Actions" },
    ];

    return (
        <StyledDocumentUploadPage>
            <DocumentTable
                documents={documents}
                emptyMessage="No documents uploaded."
                columns={columns}
                toolbar={
                    <Toolbar>
                        <Box display="flex" flexGrow={1}></Box>
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
