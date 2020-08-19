import React from "react";
import Summary from "./components/Summary/Summary";
import VietnamStats from "./components/VietnamStats/VietnamStats";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Summary />
        <VietnamStats />
      </React.Fragment>
    );
  }
}
export default App;
