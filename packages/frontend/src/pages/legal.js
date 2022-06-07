import React from "react";
import Meta from "../components/other_stuff/Meta";
import LegalSection from "../components/other_stuff/LegalSection";
import { useRouter } from "./../util/router";

function LegalPage(props) {
  const router = useRouter();

  return (
    <>
      <Meta title="Legal" />
      <LegalSection
        bgColor="default"
        size="normal"
        bgImage=""
        bgImageOpacity={1}
        section={router.query.section}
        key={router.query.section}
      />
    </>
  );
}

export default LegalPage;
