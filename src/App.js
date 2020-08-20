import React from "react";
import Summary from "./components/Summary/Summary";
import VietnamStats from "./components/VietnamStats/VietnamStats";
import QuickFacts from './components/QuickFacts/QuickFacts'
import VietnamQuickFacts from './components/VietnamQuickFacts/VietnamQuickFacts'
import TabBars from './components/TabBars/TabBars'
import Header from "./containers/Header/Header";
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TabBars/>
        <QuickFacts/>
        <VietnamQuickFacts/>
        <Summary />
        <VietnamStats />
        <Header />
      </React.Fragment>
    );
  }
}
export default App;
