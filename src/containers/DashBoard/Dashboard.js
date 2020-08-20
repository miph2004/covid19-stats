import React from "react";
import Summary from "../../components/Summary/Summary";
import VietnamStats from "../../components/VietnamStats/VietnamStats";
import QuickFacts from "../../components/QuickFacts/QuickFacts";
class DashBoard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <QuickFacts />
        <Summary />
        <VietnamStats />
      </React.Fragment>
    );
  }
}
export default DashBoard;
