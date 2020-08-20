import React from "react";
import axios from "axios";
import { Spin, Tabs, Card, Col, Row, Statistic } from "antd";
import "./QuickFasts.css";

class QuickFasts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
    };
  }
  componentDidMount() {
    axios.get("https://api.covid19api.com/summary").then(
      (response) => {
        this.setState({
          data: response.data.Global,
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
    const { TotalConfirmed, TotalDeaths, TotalRecovered } = this.state.data;
    if (isLoaded) {
      return (
        <Row>
          <Col md={8}>
            <Statistic
              title="TỔNG CA NHIỄM"
              value={TotalConfirmed}
              valueStyle={{
                color: "#77778B",
                fontSize: 30,
                fontWeight: "bold",
                margin: 10,
              }}
            />
            <a href="/" className="link">
              view by country
            </a>
          </Col>
          <Col md={8}>
            <Statistic
              title="TỬ VONG"
              value={TotalDeaths}
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
              value={TotalRecovered}
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
      <Card
        bordered={false}
        title="Global"
        headStyle={{
          backgroundColor: "#F5F5F5",
          color: "#77778B",
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
    );
  }
}
export default QuickFasts;
