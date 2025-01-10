import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";

interface TableData {
    category: string;
    amount: string;
}

interface CustomTableProps {
    data: TableData[];
}

export const CustomTable: React.FC<CustomTableProps> = ({ data }) => {
    return (
        <TableContainer component={Paper} sx={{ width: "487px" }}>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell><Typography fontWeight="bold">Kategori</Typography></TableCell>
                        <TableCell align="right"><Typography fontWeight="bold">Tutar</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.category}</TableCell>
                            <TableCell align="right">{item.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}