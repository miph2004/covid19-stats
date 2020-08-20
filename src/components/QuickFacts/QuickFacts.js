import React from "react";
import axios from "axios";
import { Spin, Tabs, Card, Col, Row, Statistic } from "antd";
import "./QuickFasts.css";

class QuickFasts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCases: 0,
      totalDeaths: 0,
      recovered: 0,
      lastUpdated: "",
      isLoaded: false,
    };
  }
  componentDidMount() {
    axios.get("https://api.covid19api.com/summary").then(
      (response) => {
        const {
          TotalConfirmed,
          TotalDeaths,
          TotalRecovered,
        } = response.data.Global;
        this.setState({
          totalCases: TotalConfirmed,
          totalDeaths: TotalDeaths,
          recovered: TotalRecovered,
          lastUpdated: response.data.Date,
          isLoaded: true,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  mainContent() {
    const {
      isLoaded,
      totalCases,
      totalDeaths,
      recovered
    } = this.state;
    if (isLoaded) {
      return (
        <Row>
          <Col md={8}>
            <Statistic
              title="Totalvirus Cases"
              value={totalCases}
              valueStyle={{
                color: "#77778B",
                fontSize: 30,
                fontWeight: "bold",
                margin: 10,
              }}
            />
            <a href='/' className="link">view by country</a>
          </Col>
          <Col md={8}>
            <Statistic
              title="Deaths"
              value={totalDeaths}
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
              title="Total Recovered"
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
      <Card
      bordered={false}
        title='Global'
        headStyle={{
          backgroundColor: '#F5F5F5',
          color: '#77778B',
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bolder',
          marginRight: 100,
          marginLeft: 100,
        }} >
        <Card
          bordered={true}
          className="grid-content"
          style={{
            textAlign: "center", marginRight: 100,
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
