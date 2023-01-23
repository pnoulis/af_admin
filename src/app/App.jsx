import Home from "./Home";
import { FlashMessages } from "./flashMessages";

function App() {
  return (
    <FlashMessages>
      <Home />
    </FlashMessages>
  );
}

export { App };
export default App;
