import React from "react";
import { StyleAddPackage } from "./styles";
import PackageSelectionSection from "./PackageSelectionSection";
import ToolbarSection from "./ToolbarSection";
import afpackages from "/dummy_backend/afpackages.json" assert { type: "json" };
import discounts from "/dummy_backend/discounts.json" assert { type: "json" };
import { translateBackendPackages } from "./utils.js";

const state = {
  afPackages: translateBackendPackages(afpackages),
  discounts,
};
export default function AddPackage() {
  return (
    <StyleAddPackage>
      <PackageSelectionSection afPackages={state.afPackages} />
      <ToolbarSection />
    </StyleAddPackage>
  );
}
