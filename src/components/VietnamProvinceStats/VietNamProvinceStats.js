import React from "react";
import axios from "axios";
import { Table } from "antd";

import "./VietnamProvinceStats.css";

class VietnamProvinceStats extends React.Component {
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
        (res) => {
          this.setState({
            data: res.data,
            isLoaded: true,
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }
  _renderSummaryList = () => {
    const { regionData } = this.state.data;
    if (this.state.isLoaded) {
      return regionData.map((item) => {
        const totalClosedCases = item.recovered + item.deceased;
        let percentageRecovered = 0;
        let percentageDeaths = 0;
        if (totalClosedCases != 0) {
          percentageRecovered = parseFloat((item.recovered / totalClosedCases) * 100).toFixed(2)
          percentageDeaths = parseFloat((item.deceased / totalClosedCases) * 100).toFixed(2);
        }
        return {
          region: item.region,
          totalInfected: item.totalInfected,
          activeCases: item.activeCases,
          recovered: item.recovered,
          deceased: item.deceased,
          percentageRecovered: percentageRecovered + '% ',
          percentageDeaths: percentageDeaths + '% ',
        };
      });
    }
  }

  render() {
    const columns = [
      {
        title: "Tỉnh",
        dataIndex: "region",
        key: "region",
      },
      {
        title: "Tổng ca nhiễm",
        dataIndex: "totalInfected",
        key: "totalInfected",
      },
      {
        title: "Đang điều trị",
        dataIndex: "activeCases",
        key: "activeCases",
      },
      {
        title: "Số ca hồi phục",
        dataIndex: "recovered",
        key: "recovered",
      },
      {
        title: "Số ca tử vong",
        dataIndex: "deceased",
        key: "deceased",
      },
      {
        title: "Tỷ lệ hồi phục",
        dataIndex: "percentageRecovered",
        key: "percentageRecovered",
      },
      {
        title: "Tỷ lệ tử vong",
        dataIndex: "percentageDeaths",
        key: "percentageDeaths",
      },
    ];
    const dataSource = this._renderSummaryList();
    return (
      <div className="table-container">
        <span className="table-discription">Thống kê theo tỉnh</span>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default VietnamProvinceStats;
