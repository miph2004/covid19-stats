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
  _getArrCountry = ()=>{
    const {Countries} = this.state.data;
    if(this.state.isLoaded){
        return Countries.map(item=>{
            return {
                text: item.Country,
                value: item.Country
            };
        });
    }
  }
  render() {
    const dataSource = this._renderSummaryList();
    const country = this._getArrCountry();
    const columns = [
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        filters: country,
        onFilter: (value, record) => record.country.indexOf(value) === 0,
        sorter: (a, b) => a.country.length - b.country.length,
        sortDirections: ['descend'],
      },
      {
        title: "New Confirmed",
        dataIndex: "newConfirmed",
        key: "newConfirmed",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.newConfirmed - b.newConfirmed,
      },
      {
        title: "New Deaths",
        dataIndex: "newDeaths",
        key: "newDeaths",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.newDeaths - b.newDeaths,
      },
      {
        title: "New Recovered",
        dataIndex: "newRecovered",
        key: "newRecovered",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.newRecovered - b.newRecovered,
      },
      {
        title: "Total Confirmed",
        dataIndex: "totalConfirmed",
        key: "totalConfirmed",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.totalConfirmed - b.totalConfirmed,
      },
      {
        title: "Total Deaths",
        dataIndex: "totalDeaths",
        key: "totalDeaths",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.totalDeaths - b.totalDeaths,
      },
      {
        title: "Total Recovered",
        dataIndex: "totalRecovered",
        key: "totalRecovered",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.totalRecovered - b.totalRecovered,
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
