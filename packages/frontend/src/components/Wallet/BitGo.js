import { useState, useEffect } from "react";
import SendFunds from "./SendFunds";
import {Card, TableContainer, TableRow, TableCell} from "@material-ui/core";
import { CardHeader } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import CreateWallet from "./CreateWallet";
import ListOfWallets from "./ListOfWallets";

export default function BitGo(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([])
    const [wallet, setWallets] = useState([])
    const [name, setName] = useState('')
    const [balance, setBalance] = useState('')
    const [walletLabel, setWalletLabel] = useState('')

    return (
        <div>

            <Card>
                <CardContent>
                    <Typography variant="h5">1. Fill out the form to create a wallet</Typography>
                    <CreateWallet/>
                </CardContent>
            </Card>

            <br></br><br></br>
            <Card>
                <CardContent>
                    <Typography variant="h5">2. Send funds to the wallet</Typography>
                    <SendFunds/>
                </CardContent>
            </Card>


        </div>
    )
}
