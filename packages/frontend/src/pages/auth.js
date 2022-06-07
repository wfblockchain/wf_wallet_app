import React from "react";
import Meta from "../components/other_stuff/Meta";
import AuthSection from "../components/auth/AuthSection";
import { useRouter } from "./../util/router";

function AuthPage(props) {
  const router = useRouter();

  return (
    <>
      <Meta title="Auth" />
      <AuthSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        type={router.query.type}
        providers={["google", "facebook", "twitter"]}
        afterAuthPath={router.query.next || "/dashboard"}
      />
    </>
  );
}

export default AuthPage;
