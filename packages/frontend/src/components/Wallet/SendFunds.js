import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useForm } from "react-hook-form";
import {FormControl, InputLabel, Select} from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";

export default function SendFunds(props) {
    const [pending, setPending] = useState(false);

    const [amount, setAmount] = React.useState('');
    const [address, setAddress] = React.useState([]);
    const [message, setMessage] = React.useState('');
    const [walletNames, setWalletNames] = React.useState('');
    const [wallets, setWallets] = useState([]);
    const [walletId, setWalletId] = useState('');
    const [senderAddress, setSenderAddress] = useState('');
    const [password, setPassword] = useState('');
    const [destAddress, setDestAddress] = useState('');

    var wallet = props.walletId
    const coin = 'tbtc';

    const { handleSubmit, getValues, errors, sendFunds } = useForm();

    const getSenderAddress = (event) => {
        setSenderAddress(event.target.value);
    };

    const getWalletId = (event) => {
        //Every time someone selects a new wallet the sender address value resets
        setSenderAddress('')

        console.log("selected " + event.target.value);

        setWalletNames(event.target.value);

        //Look up wallet id from wallet name
        setWalletId(wallets.find(wallet => wallet.label === event.target.value).id)

        for(let key of Object.keys(wallets)){

            if(wallets[key].label === event.target.value){
                setWalletId(wallets[key].id);
            }
        }
        console.log(walletId)

        getAddresses(coin, walletId);

        return walletId;
    };

    const onSubmit = (data) => {
        console.log('address:', address);
        console.log('amount:', amount);

        transferFunds(coin, walletId, senderAddress, password, destAddress, amount);
    };

    function transferFunds(walletId, destAddress, amount) {
        var req_url = process.env.REACT_APP_API_SERVER_URL +"/send_coin";
        console.log(req_url);

        fetch(req_url, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                otp: "000000",
                walletId: walletId,
                password: password,
                destAddress: destAddress,
                amount: amount
            })
        })
    }

    function getAddresses(coin, walletId) {
        var req_url = process.env.REACT_APP_API_SERVER_URL +"/address_list" + "/coin=" + coin + "/wallet=" + walletId;
        console.log(req_url);

        fetch(req_url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data.addresses);
                setAddress(data.addresses)
                console.log(data.addresses)
            })
            .catch(error => {
                console.log(error);
            });

        console.log(Array.isArray(address));
        console.log(address)
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

                setWalletNames(data.wallets.label)
            })

        console.log(Array.isArray(wallets));
        console.log(wallets)
    }

    useEffect(() => {
        getWallets(coin)
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container={true} spacing={2}>
                <Grid item={true} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Wallets</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={walletNames}
                            label="Wallet Names"
                            onChange={getWalletId}
                        >
                            {wallets.map((wallet) => (
                                <MenuItem key={wallet.label} value={wallet.label}>
                                    {wallet.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item={true} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="address-list-select-label">Addresses</InputLabel>
                        <Select
                            labelId="address-list"
                            id="address-list-select"
                            value={senderAddress}
                            label="Sending Addresses"
                            onChange={getSenderAddress}
                        >
                            {address.map((address_selected) => (
                                <MenuItem key={address_selected.address} value={address_selected.address}>
                                    {address_selected.address}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item={true} xs={12}>
                    <TextField
                        variant="outlined"
                        type="text"
                        label="Destiantion Address"
                        name="destAddress"
                        fullWidth={true}
                        onChange={(e) => setDestAddress(e.target.value)}
                    />
                </Grid>

                <Grid item={true} xs={12}>
                    <TextField
                        variant="outlined"
                        type="number"
                        label="Amount"
                        name="amount"
                        fullWidth={true}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <TextField
                        variant="outlined"
                        type="password"
                        label="Password"
                        name="password"
                        placeholder="something something"
                        fullWidth={true}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        disabled={pending}
                        fullWidth={true}
                    >
                        {!pending && <span>Send Funds</span>}

                        {pending && <CircularProgress size={28} />}
                    </Button>
                </Grid>
            </Grid>
        </form>
  );
}