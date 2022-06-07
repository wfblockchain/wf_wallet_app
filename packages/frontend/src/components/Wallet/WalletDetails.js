import SendFunds from "./SendFunds";
import Container from "@material-ui/core/Container";
import {Card} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useState} from "react";

export default function WalletDetails({walletId}) {

    const [txnHistory, setTxnHistory] = useState([])
    //TODO: Add Wallet Context like Auth

    function getTxnHistory(coin, walletId) {

        var req_url = process.env.REACT_APP_API_SERVER_URL +"/txn_history" + "/coin=" + coin + "/walletId=" + walletId;

        console.log(req_url);

        fetch(req_url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setTxnHistory(data)
            })
    }

    return(
        <div>
            <Container>
                <Typography variant="h5">Transaction History</Typography>


            </Container>
        </div>
    )
}
