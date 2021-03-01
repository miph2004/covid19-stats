import React from "react";
import axios from "axios";
import { Statistic, Spin, Row, Col, Card } from "antd";
class VietnamQuickFacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
    };
  }
  componentDidMount() {
    axios
      .get(
        "https://api.apify.com/v2/key-value-stores/EaCBL1JNntjR3EakU/records/LATEST?disableRedirect=true"
      )
      .then(
        (response) => {
          this.setState({
            data: response.data,
            isLoaded: true,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  mainContent() {
    const { isLoaded } = this.state;
    const { treated, recovered, deceased } = this.state.data;
    const total = treated + recovered + deceased;
    if (isLoaded) {
      return (
        <Row>
          <Col md={8}>
            <Statistic
              title="TỔNG CA"
              value={total}
              valueStyle={{
                color: "#77778B",
                fontSize: 30,
                fontWeight: "bold",
                margin: 10,
              }}
            />
          </Col>
          <Col md={8}>
            <Statistic
              title="TỬ VONG"
              value={deceased}
              valueStyle={{
                color: "#F63A4B",
                fontSize: 30,
                fontWeight: "bold",
                margin: 10,
              }}
            />
          </Col>
          <Col md={8}>
            <Statistic
              title="HỒI PHỤC"
              value={recovered}
              valueStyle={{
                color: "#699a21",
                fontSize: 30,
                fontWeight: "bold",
                margin: 10,
              }}
            />
          </Col>
        </Row>
      );
    } else {
      return <Spin spinning={isLoaded.toString()} />;
    }
  }
  render() {
    return (
      <div className="card-container">
        <Card
          bordered={false}
          title="Việt Nam"
          headStyle={{
            backgroundColor: "#F5F5F5",
            color: "#1890ff",
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bolder",
            marginRight: 100,
            marginLeft: 100,
          }}
        >
          <Card
            bordered={true}
            className="grid-content"
            style={{
              textAlign: "center",
              marginRight: 100,
              marginLeft: 100,
            }}
          >
            {this.mainContent()}
          </Card>
        </Card>
      </div>
    );
  }
}
export default VietnamQuickFacts;
