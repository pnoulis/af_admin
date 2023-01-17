import PackageSection from "./PackageSection";
import PlayersSection from "./PlayersSection";
import { StyleSummary } from "./styles";

function Summary() {
  return (
    <StyleSummary>
      <PlayersSection />
      <PackageSection />
    </StyleSummary>
  );
}

export default Summary;
