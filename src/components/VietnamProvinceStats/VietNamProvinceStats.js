import React from "react";
import axios from "axios";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
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
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
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
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
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

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  render() {
    const columns = [
      {
        title: "Tỉnh",
        dataIndex: "region",
        key: "region",
        ...this.getColumnSearchProps("region"),
      },
      {
        title: "Tổng ca",
        dataIndex: "totalInfected",
        key: "totalInfected",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.totalInfected - b.totalInfected,
      },
      {
        title: "Đang điều trị",
        dataIndex: "activeCases",
        key: "activeCases",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.activeCases - b.activeCases,
      },
      {
        title: "Số ca hồi phục",
        dataIndex: "recovered",
        key: "recovered",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.recovered - b.recovered,
      },
      {
        title: "Số ca tử vong",
        dataIndex: "deceased",
        key: "deceased",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.deceased - b.deceased,
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
