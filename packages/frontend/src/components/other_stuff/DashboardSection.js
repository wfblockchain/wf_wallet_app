import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LinkMui from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import DashboardItems from "./DashboardItems";
import { Link, useRouter } from "../../util/router";
import { useAuth } from "../../util/auth";
import ListOfWallets from "../Wallet/ListOfWallets";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import CreateWallet from "../Wallet/CreateWallet";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
}));

function DashboardSection(props) {
  const classes = useStyles();

  const auth = useAuth();

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={4}
          textAlign="center"
        />

          <Container>
            <Typography variant="h6">Welcome back {auth.user.email} below are your wallets</Typography>

            <Card>
              <ListOfWallets/>
            </Card>
            <br></br>
            <Container>
              <Typography variant="h6">Don't have a wallet? Click below to create one</Typography>
              <Button
                  component={Link}
                  to="/create_wallet"
                  variant="contained"
                  size="large"
                  color={props.buttonColor}
              >
                Create Wallet
              </Button>
            </Container>

          </Container>

      </Container>

    </Section>


  );
}

export default DashboardSection;
