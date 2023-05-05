import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    TableSortLabel,
    Typography,
} from "@mui/material";
import styled from "@emotion/styled";

const StyledTableContainer = styled(TableContainer)`

`;

const EmptyMessageContainer = styled.div`
    margin: 35px;
`;

const DocumentTable = ({ documents, emptyMessage, toolbar }) => {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("title");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedDocuments = documents
        .slice()
        .sort((a, b) => {
            const aValue = a[orderBy];
            const bValue = b[orderBy];
            if (aValue < bValue) {
                return order === "asc" ? -1 : 1;
            }
            if (aValue > bValue) {
                return order === "asc" ? 1 : -1;
            }
            return 0;
        });

    const displayedDocuments = sortedDocuments.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <StyledTableContainer component={Paper}>
            {toolbar}
            <Table aria-label="document table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === "title"}
                                direction={order}
                                onClick={() => handleRequestSort("title")}
                            >
                                Title
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === "description"}
                                direction={order}
                                onClick={() => handleRequestSort("description")}
                            >
                                Description
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                {displayedDocuments.length > 0 ? (
                    <TableBody>
                        {displayedDocuments.map((doc) => (
                            <TableRow key={doc.id}>
                                <TableCell>{doc.title}</TableCell>
                                <TableCell>{doc.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                ) : (
                    <EmptyMessageContainer>
                        <Typography variant="body1">{emptyMessage || "No documents"}</Typography>
                    </EmptyMessageContainer>
                )}
            </Table>
            <TablePagination
                component="div"
                count={documents.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </StyledTableContainer>
    );
};

export default DocumentTable;
