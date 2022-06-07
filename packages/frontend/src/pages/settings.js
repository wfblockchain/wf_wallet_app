import React from "react";
import Meta from "../components/other_stuff/Meta";
import SettingsSection from "../components/other_stuff/SettingsSection";
import { useRouter } from "./../util/router";
import { requireAuth } from "./../util/auth";

function SettingsPage(props) {
  const router = useRouter();

  return (
    <>
      <Meta title="Settings" />
      <SettingsSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        section={router.query.section}
        key={router.query.section}
      />
    </>
  );
}

export default requireAuth(SettingsPage);
