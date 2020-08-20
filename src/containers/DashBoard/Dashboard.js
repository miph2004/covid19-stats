import React from "react";
import Summary from "../../components/Summary/Summary";
import VietnamStats from "../../components/VietnamStats/VietnamStats";
import QuickFacts from "../../components/QuickFacts/QuickFacts";
import VietnamQuickFacts from "../../components/VietnamQuickFacts/VietnamQuickFacts";
import VietnamProvinceStats from "../../components/VietnamProvinceStats/VietNamProvinceStats";

import { Row, Col } from "antd";
class DashBoard extends React.Component {
  render() {
    return (
      <div className="container">
        <Row>
          <Col span={12}>
            <QuickFacts />
          </Col>
          <Col span={12}>
            <VietnamQuickFacts />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Summary />
          </Col>

          <Col span={12}>
            <VietnamProvinceStats />
          </Col>
        </Row>
      </div>
    );
  }
}
export default DashBoard;
