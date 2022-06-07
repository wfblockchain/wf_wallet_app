import React from "react";
import Meta from "../components/other_stuff/Meta";
import DashboardSection from "../components/other_stuff/DashboardSection";
import { requireAuth } from "./../util/auth";

function DashboardPage(props) {
  return (
    <>
      <Meta title="Dashboard" />
      <DashboardSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Dashboard"
        subtitle=""
      />

    </>
  );
}

export default requireAuth(DashboardPage);
