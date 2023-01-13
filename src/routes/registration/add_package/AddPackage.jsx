import React from "react";
import { StyleAddPackage } from "./styles";
import PackageSelectionSection from "./PackageSelectionSection";
import ToolbarSection from "./ToolbarSection";

const state = {
  afPackages: [
    {
      name: "",
      permutations: [
        {
          name: "",
        },
      ],
    },
  ],
  discount: {
    name: "",
    code: "",
  },
};
export default function AddPackage() {
  return (
    <StyleAddPackage>
      <PackageSelectionSection afPackages={state} />
      <ToolbarSection />
    </StyleAddPackage>
  );
}
