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
            data: res.data.regionData,
          });
        },
        (err) => {
          console.log(err);
        }
      );
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
    ];
    return (
      <div className="table-container">
        <span className="table-discription">Thống kê theo tỉnh</span>
        <Table dataSource={this.state.data} columns={columns} />
      </div>
    );
  }
}

export default VietnamProvinceStats;
