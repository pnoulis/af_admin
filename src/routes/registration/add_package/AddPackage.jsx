import React from "react";
import { StyleAddPackage } from "./styles";
import PackageSelectionSection from "./PackageSelectionSection";
import ToolbarSection from "./ToolbarSection";

export default function AddPackage() {
  return (
    <StyleAddPackage>
      <PackageSelectionSection />
      <ToolbarSection />
    </StyleAddPackage>
  );
}
