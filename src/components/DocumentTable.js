import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import styled from "@emotion/styled";

const StyledTableContainer = styled(TableContainer)`
  
`;

const DocumentTable = ({ documents }) => {
    return (
        <StyledTableContainer component={Paper}>
            {documents && <Table aria-label="document table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {documents.map((doc) => (
                        <TableRow key={doc.id}>
                            <TableCell>{doc.title}</TableCell>
                            <TableCell>{doc.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>}
        </StyledTableContainer>
    );
};

export default DocumentTable;
