import React from "react";
import axios from "axios";
import { Spin, Tabs, Card, Col, Row, Statistic } from "antd";
import "./QuickFasts.css";

class QuickFasts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            totalCases: 0,
            totalDeaths: 0,
            recovered: 0,
            lastUpdated: '',
            isLoaded: false,
            contentRoutes: [
                {
                    name: 'Graph'
                },
                {
                    name: 'Countries'
                },
                {
                    name: 'Death Rate'
                },
                {
                    name: 'Sympthoms'
                },
                {
                    name: 'Incubation'
                },
                {
                    name: 'Transmission'
                },
                {
                    name: 'News'
                },
            ]
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
                    lastUpdated: response.data.Date,
                    isLoaded: true,
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }
    mainContent() {
        var {
            isLoaded, 
            totalCases,
            totalDeaths,
            recovered
        } = this.state;
        totalCases = new Intl.NumberFormat().format(totalCases);
        totalDeaths = new Intl.NumberFormat().format(totalDeaths);
        recovered = new Intl.NumberFormat().format(recovered);
        if (isLoaded) {
            return (
                <Row>
                    <Col md={8}>
                        <Statistic
                            title='Totalvirus Cases'
                            value={totalCases}
                            valueStyle={{
                                color: '#77778B',
                                fontSize: 30,
                                fontWeight: 'bold',
                                margin: 10
                            }}
                        />
                        <a className="link">view by country</a>
                    </Col>
                    <Col md={8}>
                        <Statistic
                            title='Deaths'
                            value={totalDeaths}
                            valueStyle={{
                                color: '#77778B',
                                fontSize: 30,
                                fontWeight: 'bold',
                                margin: 10
                            }}
                        />
                    </Col>
                    <Col md={8}>
                        <Statistic
                            title='Total Recovered'
                            value={recovered}
                            valueStyle={{
                                color: '#699a21',
                                fontSize: 30,
                                fontWeight: 'bold',
                                margin: 10
                            }}
                        />
                    </Col>
                </Row>
            )
        }
        else{
            return <Spin spinning={isLoaded.toString()}/>
        }
    }
    render() {
        var {
            contentRoutes, 
            lastUpdated,    
        } = this.state;
        lastUpdated = new Date();
        return (
            <div>
                <div className='title'>
                    <p>COVID-19 CORONAVIRUS PANDEMIC</p>
                </div>
                <div className='last-updated'>
                    <p>{lastUpdated.toString()}</p>
                </div>
                <Tabs
                    centered={true}
                    type='line'
                    tabBarStyle=
                    {{
                        backgroundColor: '#699a21',
                        color: '#fff'
                    }}
                >
                    {
                        contentRoutes.map((route, index) => {
                            return <Tabs.TabPane key={index} tab={route.name} />
                        })
                    }
                </Tabs>
                <Card
                    className='grid-content'
                    style={{ textAlign: 'center', margin: 20 }}>
                        {this.mainContent()}
                </Card>
            </div>
        )
    }
}
export default QuickFasts;