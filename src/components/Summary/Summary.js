import React from "react";
import axios from "axios";
import { Table } from "antd";
import "./Summary.css";

class Summary extends React.Component {
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
          data: response.data,
          isLoaded: true,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  _renderSummaryList = () => {
    const { Countries } = this.state.data;

    if (this.state.isLoaded) {
      return Countries.map((item) => {
        const totalClosedCases = item.TotalDeaths + item.TotalRecovered;
        let percentageRecovered = 0;
        let percentageDeaths = 0;
        let newPercentageRecovered = 0 ;
        let newPercentageDeaths = 0 ;
        if (totalClosedCases != 0) {
          percentageRecovered = parseFloat((item.TotalRecovered / totalClosedCases) * 100).toFixed(2)
          percentageDeaths = parseFloat((item.TotalDeaths / totalClosedCases) * 100).toFixed(2);
          newPercentageRecovered = parseFloat((item.NewConfirmed / totalClosedCases) * 100).toFixed(2)
          newPercentageDeaths = parseFloat((item.NewDeaths / totalClosedCases) * 100).toFixed(2)
        }
        return {
          country: item.Country,
          newConfirmed: item.NewConfirmed,
          newDeaths: item.NewDeaths,
          newRecovered: item.NewRecovered,
          totalConfirmed: item.TotalConfirmed,
          totalDeaths: item.TotalDeaths,
          totalRecovered: item.TotalRecovered,
          percentageRecovered: percentageRecovered + '%' +`(${newPercentageRecovered}%)`,
          percentageDeaths: percentageDeaths + '%' +`up(${newPercentageDeaths}%)`,
          date: item.Date,
        };
      });
    }
  };

  render() {
    const dataSource = this._renderSummaryList();
    const columns = [
      {
        title: "Tên quốc gia",
        dataIndex: "country",
        key: "country",
      },
      {
        title: "Số ca nhiễm mới",
        dataIndex: "newConfirmed",
        key: "newConfirmed",
      },
      {
        title: "Số ca tử vong mới",
        dataIndex: "newDeaths",
        key: "newDeaths",
      },
      {
        title: "Số ca hồi phục mới",
        dataIndex: "newRecovered",
        key: "newRecovered",
      },
      {
        title: "Tổng ca nhiễm",
        dataIndex: "totalConfirmed",
        key: "totalConfirmed",
      },
      {
        title: "Tổng ca tử vong",
        dataIndex: "totalDeaths",
        key: "totalDeaths",
      },
      {
        title: "Tổng ca hồi phục",
        dataIndex: "totalRecovered",
        key: "totalRecovered",
      },
      {
        title: "Thời điểm",
        dataIndex: "date",
        key: "date",
      },
    ];
    return (
      <div className="table-container">
        <span className="table-discription">Thống kê thế giới</span>
        <Table
          scroll={{ y: 464, x: 500 }}
          columns={columns}
          dataSource={dataSource}
        />
        ;
      </div>
    );
  }
}
export default Summary;
