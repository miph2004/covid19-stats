import React from "react";
import axios from "axios";
import { Table } from "antd";

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

  _renderCountryList = () => {
    const { Countries } = this.state.data;
    console.log(Countries);
    if (this.state.isLoaded) {
      return Countries.map((item) => {
        return {
          country: item.Country,
          newConfirmed: item.NewConfirmed,
          newDeaths: item.NewDeaths,
          newRecovered: item.NewRecovered,
          totalConfirmed: item.TotalConfirmed,
          totalDeaths: item.TotalDeaths,
          totalRecovered: item.TotalRecovered,
          date: item.Date,
        };
      });
    }
  };

  render() {
    const dataSource = this._renderCountryList();
    const columns = [
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
      },
      {
        title: "New Confirmed",
        dataIndex: "newConfirmed",
        key: "newConfirmed",
      },
      {
        title: "New Deaths",
        dataIndex: "newDeaths",
        key: "newDeaths",
      },
      {
        title: "New Recovered",
        dataIndex: "newRecovered",
        key: "newRecovered",
      },
      {
        title: "Total Confirmed",
        dataIndex: "totalConfirmed",
        key: "totalConfirmed",
      },
      {
        title: "Total Deaths",
        dataIndex: "totalDeaths",
        key: "totalDeaths",
      },
      {
        title: "Total Recovered",
        dataIndex: "totalRecovered",
        key: "totalRecovered",
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
    ];
    return <Table columns={columns} dataSource={dataSource} />;
  }
}
export default Summary;
