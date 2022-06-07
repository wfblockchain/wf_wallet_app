import SendFunds from "./SendFunds";
import Container from "@material-ui/core/Container";
import {Card} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export default function WalletDetails(props) {

    console.log(props.walletId)

    console.log(props);

    return(
        <div>
            <Container>
                <Typography variant="h5">Use the Form Below to Send Funds</Typography>
                <br></br>
                <Card>
                    <SendFunds/>
                </Card>

            </Container>
        </div>
    )
}
