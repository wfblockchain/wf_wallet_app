import React from "react";
import Navbar from "../components/other_stuff/Navbar";
import IndexPage from "./index";
import AboutPage from "./about";
import FaqPage from "./faq";
import ContactPage from "./contact";
import DashboardPage from "./dashboard";
import AuthPage from "./auth";
import SettingsPage from "./settings";
import LegalPage from "./legal";
import Wallet from "./wallet";

import { Switch, Route, Router } from "./../util/router";
import FirebaseActionPage from "./firebase-action";
import NotFoundPage from "./404";
import Footer from "../components/other_stuff/Footer";
import { AuthProvider } from "./../util/auth";
import { ThemeProvider } from "./../util/theme";
import { QueryClientProvider } from "./../util/db";
import CreateWallet from "../components/Wallet/CreateWallet";
import WalletDetails from "../components/Wallet/WalletDetails";

function App(props) {
  require('dotenv').config();

  return (
    <QueryClientProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <>
              <Navbar
                color="default"
                logo="https://www.wellsfargo.com/assets/images/logos/wellsfargo/logo_974x1050.png"
                logoInverted="https://www.wellsfargo.com/assets/images/logos/wellsfargo/logo_974x1050.png"
              />

              <Switch>
                <Route exact path="/" component={IndexPage} />

                <Route exact path="/wallet" component={Wallet} />

                <Route exact path="/create_wallet" component={CreateWallet} />

                <Route exact path="/wallet_details" component={WalletDetails} />

                <Route exact path="/about" component={AboutPage} />

                <Route exact path="/faq" component={FaqPage} />

                <Route exact path="/contact" component={ContactPage} />

                <Route exact path="/dashboard" component={DashboardPage} />

                <Route exact path="/auth/:type" component={AuthPage} />

                <Route
                  exact
                  path="/settings/:section"
                  component={SettingsPage}
                />

                <Route exact path="/legal/:section" component={LegalPage} />

                <Route
                  exact
                  path="/firebase-action"
                  component={FirebaseActionPage}
                />

                <Route component={NotFoundPage} />
              </Switch>

              <Footer
                bgColor="light"
                size="normal"
                bgImage=""
                bgImageOpacity={1}
                description="A short description of what you do here"
                copyright={`© ${new Date().getFullYear()} Wells Fargo`}
                logo="https://www.wellsfargo.com/assets/images/logos/wellsfargo/logo_974x1050.png"
                logoInverted="https://www.wellsfargo.com/assets/images/logos/wellsfargo/logo_974x1050.png"
                sticky={true}
              />
            </>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
