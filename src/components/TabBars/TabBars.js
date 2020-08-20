import React from 'react'
import { Tabs } from 'antd'
class TabBars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentRoutes: [
                {
                    name: "Graph",
                },
                {
                    name: "Countries",
                },
                {
                    name: "Death Rate",
                },
                {
                    name: "Sympthoms",
                },
                {
                    name: "Incubation",
                },
                {
                    name: "Transmission",
                },
                {
                    name: "News",
                },
            ],
        }
    }
    render() {
        const { contentRoutes } = this.state;
        return (
            <Tabs
                centered={true}
                type="line"
                tabBarStyle={{
                    backgroundColor: "#699a21",
                    color: "#fff",
                    marginBottom: 50,
                }}
            >
                {contentRoutes.map((route, index) => {
                    return <Tabs.TabPane key={index} tab={route.name} />;
                })}
            </Tabs>
        )
    }
}
export default TabBars;