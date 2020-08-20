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
          <Col md={12}>
            <QuickFacts />
          </Col>
          <Col md={12}>
            <VietnamQuickFacts />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Summary />
          </Col>

          <Col md={12}>
            <VietnamProvinceStats />
          </Col>
        </Row>
        <Row>
          <Col md={24}>
            <VietnamStats />
          </Col>
        </Row>
      </div>
    );
  }
}
export default DashBoard;
