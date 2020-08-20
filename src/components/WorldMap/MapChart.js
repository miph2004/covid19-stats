import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import axios from "axios";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

class MapChart extends React.Component {
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

  _getStatusByName = (name) => {
    const { Countries } = this.state.data;
    if (this.state.isLoaded) {
      for (let i = 0; i < Countries.length; i++) {
        if (
          Countries[i].Slug.toLowerCase() === name.toLowerCase() ||
          Countries[i].Country.toLowerCase() === name.toLowerCase()
        ) {
          return Countries[i];
        }
      }

      return null;
    }
  };

  render() {
    const { setTooltipContent } = this.props;
    return (
      <>
        <ComposableMap data-tip="" projectionConfig={{ scale: 150 }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME } = geo.properties;
                    const STATUS = this._getStatusByName(NAME);
                    if (STATUS !== null) {
                      setTooltipContent(
                        <p>
                          Tên quốc gia - <b>{STATUS.Country}</b>
                          <br />
                          Tổng ca nhiễm - <b>{STATUS.TotalConfirmed}</b>
                          <br />
                          Hồi phục - <b>{STATUS.TotalRecovered}</b>
                          <br />
                          Tử vong - <b>{STATUS.TotalDeaths}</b>
                        </p>
                      );
                    } else {
                      setTooltipContent(`${NAME} - Chưa có dữ liệu`);
                    }
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none",
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </>
    );
  }
}

export default MapChart;
