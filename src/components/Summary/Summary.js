import React from "react";
import axios from "axios";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons'; 
import Highlighter from 'react-highlight-words';
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
          percentageRecovered: percentageRecovered + '% ' +`(↑${newPercentageRecovered}%)`,
          percentageDeaths: percentageDeaths + '% ' +`(↑${newPercentageDeaths}%)`,
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
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  render() {
    const dataSource = this._renderSummaryList();
    const country = this._getArrCountry();
    const columns = [
      {
        title: "Tên quốc gia",
        dataIndex: "country",
        key: "country",
        
        ...this.getColumnSearchProps('country'),
      },
      {
        title: "Số ca nhiễm mới",
        dataIndex: "newConfirmed",
        key: "newConfirmed",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.newConfirmed - b.newConfirmed,
      },
      {
        title: "Số ca tử vong mới",
        dataIndex: "newDeaths",
        key: "newDeaths",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.newDeaths - b.newDeaths,
      },
      {
        title: "Số ca hồi phục mới",
        dataIndex: "newRecovered",
        key: "newRecovered",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.newRecovered - b.newRecovered,
      },
      {
        title: "Tổng ca nhiễm",
        dataIndex: "totalConfirmed",
        key: "totalConfirmed",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.totalConfirmed - b.totalConfirmed,
      },
      {
        title: "Tổng ca tử vong",
        dataIndex: "totalDeaths",
        key: "totalDeaths",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.totalDeaths - b.totalDeaths,
      },
      {
        title: "Tổng ca hồi phục",
        dataIndex: "totalRecovered",
        key: "totalRecovered",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.totalRecovered - b.totalRecovered,
      },
      {
        title: "Tỷ lệ hồi phục",
        dataIndex: "percentageRecovered",
        key: "percentageRecovered",
      },
      {
        title: "Tỷ lệ tử vong",
        dataIndex: "percentageRecovered",
        key: "percentageRecovered",
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
