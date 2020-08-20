import React from "react";
import axios from "axios";
import { Table } from "antd";
import "./VietnamStats.css";

class VietnamStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    axios
      .get(
        "https://api.covid19api.com/country/vietnam?from=2020-03-01T00:00:00Z&to=" +
          date +
          "T00:00:00Z"
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

  _renderVietNamStatsList = () => {
    const data = this.state.data;
    if (this.state.isLoaded) {
      return data.reverse().map((item) => {
        return {
          country: item.Country,
          total: item.Confirmed,
          active: item.Active,
          recovered: item.Recovered,
          deaths: item.Deaths,
          date: item.Date,
        };
      });
    }
  };

  render() {
    const dataSource = this._renderVietNamStatsList();
    const columns = [
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
      },
      {
        title: "Active",
        dataIndex: "active",
        key: "active",
      },
      {
        title: "Recovered",
        dataIndex: "recovered",
        key: "recovered",
      },
      {
        title: "Deaths",
        dataIndex: "deaths",
        key: "deaths",
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
    ];
    return (
      <div className="table-container">
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default VietnamStats;
