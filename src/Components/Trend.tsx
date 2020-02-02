import React from 'react';
import { observer } from 'mobx-react-lite';

interface TrendProp {
    data: {
        infectSource: string,
        passWay: string,
        virus: string,
        confirmedCount: string,
        suspectedCount: string,
        curedCount: string,
        deadCount: string,
        dailyPic: string,
    },
}

const TrendApp = observer((props: TrendProp) => {
    const { data } = props;
    console.log(data);
    return (
        <>
            <div style={{
                height: 'calc(100vh - 48px)',
            }}>
                <img style={{
                    width: '100%'
                }} src={data.dailyPic} alt=""/>
            </div>
        </>
    )
});

export default TrendApp;
