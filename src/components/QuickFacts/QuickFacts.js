import React from "react";
import axios from "axios";
import { Table } from "antd";
import "./QuickFasts.css";

class QuickFasts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            totalCases: 0,
            totalDeaths: 0,
            recovered: 0,
            isLoaded: false,
        }
    }
    componentDidMount() {
        axios.get("https://api.covid19api.com/summary").then(
            (response) => {
                var { TotalConfirmed, TotalDeaths, TotalRecovered } = response.data.Global;
                this.setState({
                    totalCases: TotalConfirmed,
                    totalDeaths: TotalDeaths,
                    recovered: TotalRecovered,
                    isLoaded: true,
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }
    render() {
        var { totalCases, totalDeaths, recovered } = this.state;
        totalCases = new Intl.NumberFormat().format(totalCases)
        totalDeaths = new Intl.NumberFormat().format(totalDeaths)
        recovered = new Intl.NumberFormat().format(recovered)
        return (
            <div>
                <div className='title'>
                    <p>COVID-19 CORONAVIRUS PANDEMIC</p>
                </div>
                <div className='last-updated'>
                    <p>Last updated: August 19, 2020, 15:31 GMT</p>
                </div>
                <div className='link-content'>
                    <a className="link">Graph</a><span> - </span>
                    <a className="link">Countries</a><span> - </span>
                    <a className="link">Death Rate</a><span> - </span>
                    <a className="link">Symptoms</a><span> - </span>
                    <a className="link">Incubation</a><span> - </span>
                    <a className="link">Transmission</a><span> - </span>
                    <a className="link">News</a>
                </div>
                <div className='total-cases'>
                    <h2 className='subtitle'>Coronavirus Cases</h2>
                    <p className='case-count'>{totalCases}</p>
                    <a className="link">view by country</a>
                </div>
                <div className='total-deaths'>
                    <h2 className='subtitle'>Deaths</h2>
                    <p className='case-count'>{totalDeaths}</p>
                </div>
                <div className='recovered'>
                    <h2 className='subtitle'>Recovered</h2>
                    <p className='case-count'>{recovered}</p>
                </div>
            </div>
        )
    }
}
export default QuickFasts;