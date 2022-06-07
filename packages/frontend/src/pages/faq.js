import React from "react";
import Meta from "../components/other_stuff/Meta";
import FaqSection from "../components/other_stuff/FaqSection";

function FaqPage(props) {
  return (
    <>
      <Meta title="Faq" />
      <FaqSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Frequently Asked Questions"
        subtitle=""
      />
    </>
  );
}

export default FaqPage;
