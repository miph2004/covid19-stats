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
        const totalClosedCases = item.Recovered + item.Deaths;
        let percentageRecovered = 0;
        let percentageDeaths = 0;
        if (totalClosedCases != 0) {
          percentageRecovered = parseFloat((item.Recovered / totalClosedCases) * 100).toFixed(2)
          percentageDeaths = parseFloat((item.Deaths / totalClosedCases) * 100).toFixed(2);
        }
        return {
          country: item.Country,
          total: item.Confirmed,
          active: item.Active,
          recovered: item.Recovered,
          deaths: item.Deaths,
          percentageRecovered: percentageRecovered + '% ',
          percentageDeaths: percentageDeaths + '% ',
          date: item.Date,
        };
      });
    }
  };

  render() {
    const dataSource = this._renderVietNamStatsList();
    const columns = [
      {
        title: "Tổng số ca",
        dataIndex: "total",
        key: "total",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.total - b.total,
      },
      {
        title: "Đang điều trị",
        dataIndex: "active",
        key: "active",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.active - b.active,
      },
      {
        title: "Hồi phục",
        dataIndex: "recovered",
        key: "recovered",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.recovered - b.recovered,
      },
      {
        title: "Tử vong",
        dataIndex: "deaths",
        key: "deaths",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.deaths - b.deaths,
      },
      {
        title: "Tỷ lệ hồi phục",
        dataIndex: "percentageRecovered",
        key: "percentageRecovered",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.percentageRecovered - b.percentageRecovered,
      },
      {
        title: "Tỷ lệ tử vong",
        dataIndex: "percentageDeaths",
        key: "percentageDeaths",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.percentageDeaths - b.percentageDeaths,
      },
      {
        title: "Thời điểm",
        dataIndex: "date",
        key: "date",
      },
    ];
    return (
      <div className="table-container">
        <span className="table-discription">Thống kê Việt Nam</span>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default VietnamStats;
