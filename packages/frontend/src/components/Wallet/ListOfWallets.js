import React, { useState, useEffect } from "react";
import {
    Card,
    TableContainer,
    TableRow,
    TableCell,
    TableBody,
    Table,
    TableHead,
    Paper,
    FormControl, InputLabel, Select
} from "@material-ui/core";
import {Typography} from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Modal from '@material-ui/core/Modal';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import {Link} from "../../util/router";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ListOfWallets() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wallets, setWallets] = useState([]);
    const [walletId, setWalletId] = useState('');
    const [selectedWallet, setSelectedWallet] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [values, setValues] = useState([
        "tbtc",
        "teth"
    ]);
    const [coin, setCoin] = useState("tbtc");

    function handleChange(event) {
        setCoin(event.target.value);
        console.log(coin)
    }

    function refreshPage() {
        window.location.reload(false);
    }

    //TODO: fix delete wallet function it is not taking in the new values selected
    const deleteWallet = () => {

        console.log("deleting wallet " + walletId)

        var req_url = process.env.REACT_APP_API_SERVER_URL + "/delete_wallet/" +
            "coin=" +coin + "/" + "wallet=" + walletId


        fetch(req_url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                if(data.name == "WalletHasNonZeroBalanceError"){
                    alert("Wallet cannot be deleted because it has a balance greater than 0")
                }
                else{
                    refreshPage()
                }
            })
    }

    function getWallets(coin) {
        var req_url = process.env.REACT_APP_API_SERVER_URL +"/wallet_list" + "/coin=" + coin;
        console.log(req_url);

        fetch(req_url)
            .then(response => {
                return response.json()
            })
            .then(data => {

                setWallets(data.wallets)
            })

        console.log(Array.isArray(wallets));
        console.log(wallets)
    }

    useEffect(() => {
        getWallets(coin)
    }, [])

    return (
        <div>
            <Card sx={{ maxWidth: 345 }} >

                <br></br>
                <Typography variant="h5" align="center">BitGo {coin.toUpperCase()} Wallets</Typography>

                <br></br>

                <Container>
                <FormControl>
                    <InputLabel htmlFor="coin">Coin</InputLabel>
                    <Select
                        value={coin}
                        onChange={handleChange}
                        inputProps={{
                            name: "coin",
                            id: "coin-simple",
                        }}
                    >
                        {values.map((value, index) => {
                            return <MenuItem value={value}>{value}</MenuItem>;
                        })}
                    </Select>
                </FormControl>
                </Container>

                <br></br>

                <TableContainer component={Paper}>
                    <Table stickyHeader  aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date Created</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Balance</TableCell>
                                <TableCell>Manage</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {wallets.map((item) => (
                                <TableRow>
                                    <TableCell>{item.startDate}</TableCell>
                                    <TableCell>{item.label}</TableCell>
                                    <TableCell>{item.balance}</TableCell>
                                    <TableCell>
                                        <Button variant="contained"
                                            component={Link} to="/wallet_details"
                                         startIcon={<EditIcon />}>

                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" onClick={() => {
                                            setWalletId(item.id);
                                            console.log("wallet id "+  walletId);
                                            deleteWallet()
                                        }} startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Card>
        </div>
    )
}
