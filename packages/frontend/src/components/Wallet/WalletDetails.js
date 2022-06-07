import SendFunds from "./SendFunds";
import Container from "@material-ui/core/Container";
import {Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from "@mui/icons-material/Delete";

export default function WalletDetails({coin, walletId}) {

    console.log("wallet id passed" + walletId)

    const [entries, setEntries] = useState([[]])
    const [transferHistory, setTransferHistory] = useState([])

    function getTxnHistory(coin, walletId) {

        var req_url = process.env.REACT_APP_API_SERVER_URL +"/txn_history" + "/coin=" + coin + "/wallet=" + walletId;

        console.log(req_url);

        fetch(req_url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data.transfers)
                setTransferHistory(data.transfers)
                //setEntries(transferHistory.entries)
            }).then(() => {
                setEntries( transferHistory => [...transferHistory, `${transferHistory.length}`]);
        })

    }

    useEffect(() => {
        getTxnHistory(coin, walletId)

    }, [])

    return(
        <div>
            <Container>
                <Typography variant="h5">Transaction History</Typography>

                <TableContainer component={Paper}>
                    <Table stickyHeader  aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Wallet Sent To</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {entries.map((item) => (
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>{item[0].address}</TableCell>
                                    <TableCell>{item[0].wallet}</TableCell>
                                    <TableCell>{item[0].amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    )
}
