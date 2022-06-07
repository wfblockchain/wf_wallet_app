import React from "react";
import Meta from "../components/other_stuff/Meta";
import HeroSection from "../components/other_stuff/HeroSection";

function IndexPage(props) {
  return (
    <>
      <Meta />
      <HeroSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Wells Fargo's Crypto Wallet"
        subtitle="Keeping your Crypto safe since 2022."
        image="https://uploads.divjoy.com/undraw-japan_ubgk.svg"
        buttonText="Get Started"
        buttonColor="primary"
        buttonPath="/dashboard"
      />
    </>
  );
}

export default IndexPage;
