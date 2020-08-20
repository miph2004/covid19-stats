import React from 'react'
import axios from 'axios'
import {Statistic,Spin,Tabs,Row,Col,Card} from 'antd'
class VietnamQuickFacts extends React.Component{
    constructor(props) {
    super(props)
    this.state = {
        totalCases: 0,
        totalDeaths: 0,
        recovered: 0,
        lastUpdated: '',
        isLoaded: false,
    }
}
componentDidMount() {
    axios.get("https://api.apify.com/v2/key-value-stores/EaCBL1JNntjR3EakU/records/LATEST?disableRedirect=true").then(
        (response) => {
            const 
            { 
                infected, 
                deceased, 
                recovered,
                lastUpdatedAtSource 
            } = response.data;
            this.setState({
                totalCases: infected,
                totalDeaths: deceased,
                recovered: recovered,
                lastUpdated: lastUpdatedAtSource,
                isLoaded: true,
            });
        },
        (error) => {
            console.log(error);
        }
    );
}
mainContent() {
    const {
        isLoaded, 
        totalCases,
        totalDeaths,
        recovered
    } = this.state;
    const totalCasesFm = new Intl.NumberFormat().format(totalCases);
    const totalDeathsFm = new Intl.NumberFormat().format(totalDeaths);
    const recoveredFm = new Intl.NumberFormat().format(recovered);
    if (isLoaded) {
        return (
            <Row>
                <Col md={8}>
                    <Statistic
                        title='Totalvirus Cases'
                        value={totalCasesFm}
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
                        title='Deaths'
                        value={totalDeathsFm}
                        valueStyle={{
                            color: '#F63A4B',
                            fontSize: 30,
                            fontWeight: 'bold',
                            margin: 10
                        }}
                    />
                </Col>
                <Col md={8}>
                    <Statistic
                        title='Total Recovered'
                        value={recoveredFm}
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
        <Card
      bordered={false}
        title='Viet Nam'
        headStyle={{
          backgroundColor: '#F5F5F5',
          color: '#77778B',
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bolder',
          marginRight: 100,
          marginLeft: 100,
        }} >
        <Card
          bordered={true}
          className="grid-content"
          style={{
            textAlign: "center", marginRight: 100,
            marginLeft: 100,
          }}
        >
          {this.mainContent()}
        </Card>
      </Card>
    )
}
}
export default VietnamQuickFacts;