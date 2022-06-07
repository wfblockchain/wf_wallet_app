import { useState, useEffect } from "react";
import BitGo from "../components/Wallet/BitGo";
import Typography from "@mui/material/Typography";
import {makeStyles} from "@material-ui/core";

export default function Wallet() {
    const useStyles = makeStyles((theme) => ({
        typo: {
            flexGrow: 1,
            textAlign: "center"
        }
    }));
    const classes = useStyles();

    return (
        <div className="App">
            <Typography variant="h4" className={classes.typo} gutterBottom>
                Wallet
            </Typography>
            <Typography variant="h6" className={classes.typo} gutterBottom>
                Evaluation between BitGo and Fireblocks for Wells Fargo's Crypto Wallet offering.
                BitGo is a multi-signature wallet that allows multiple users to sign transactions, each signature is separate.
                Fireblocks is a MPC (Multi-Party Computation) wallet that allows multiple users to sign transactions, each signature is combined.
            </Typography>
            <br></br><br></br>
            <BitGo />
        </div>

    )
}
