import React from "react";
import Summary from "./components/Summary/Summary";
import VietnamStats from "./components/VietnamStats/VietnamStats";
import QuickFacts from './components/QuickFacts/QuickFacts'
import VietnamQuickFacts from './components/VietnamQuickFacts/VietnamQuickFacts'
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <QuickFacts/>
        <VietnamQuickFacts/>
        <Summary />
        <VietnamStats />
      </React.Fragment>
    );
  }
}
export default App;
