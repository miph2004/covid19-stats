import React from "react";
import axios from "axios";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons'; 
import "./VietnamStats.css";

class VietnamStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
      searchText: '',
      searchedColumn: '',
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
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.total - b.total,
      },
      {
        title: "Active",
        dataIndex: "active",
        key: "active",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.active - b.active,
      },
      {
        title: "Recovered",
        dataIndex: "recovered",
        key: "recovered",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.recovered - b.recovered,
      },
      {
        title: "Deaths",
        dataIndex: "deaths",
        key: "deaths",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.deaths - b.deaths,
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
    ];
    return <Table dataSource={dataSource} columns={columns} />;
  }
}

export default VietnamStats;
