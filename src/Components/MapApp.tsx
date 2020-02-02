import React from 'react';
import { observer } from 'mobx-react-lite'
import ReactEcharts from 'echarts-for-react';
import 'echarts/map/js/china.js';

const MapApp = observer(() => {
    function getOption() {
        const options = {
            title: {
                text: '疫情分布',
                left: 'center'
            },
            series: [
                {
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[]
                }
            ]
        };
        return options;
    }
    return (
        <>
            <ReactEcharts option={getOption()} />
        </>
    )
});

export default MapApp;
