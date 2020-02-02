import React from 'react';
import { observer } from 'mobx-react-lite'
import { Descriptions, List } from 'antd';

const Item:any = Descriptions.Item;

interface SummarizeProp {
    data: {
        infectSource: string,
        passWay: string,
        virus: string,
        confirmedCount: string,
        suspectedCount: string,
        curedCount: string,
        deadCount: string,
    },
}

const SummarizeApp = observer((props: SummarizeProp) => {
    const { data } = props;
    const remarkList = [];
    for(const i in data) {
        // @ts-ignore
        if (i.includes('mark') && data[i] !== '') {
            // @ts-ignore
            remarkList.push(data[i])
        }
    }
    return (
        <>
            <Descriptions size={'small'} bordered>
                <Item label="感染源">{data.infectSource}</Item>
                <Item label="传播">{data.passWay}</Item>
                <Item label="病毒">{data.virus}</Item>
                <Item label="确诊人数">{data.confirmedCount}</Item>
                <Item label="疑似人数">{data.suspectedCount}</Item>
                <Item label="治愈人数">{data.curedCount}</Item>
                <Item label="死亡人数">{data.deadCount}</Item>
            </Descriptions>
            <List
                style={{
                    marginTop: 10,
                }}
                header={'须知'}
                bordered
                dataSource={remarkList}
                renderItem={item => (
                    <List.Item>
                        {item}
                    </List.Item>
                )}
            >
            </List>
        </>
    )
})

export default SummarizeApp;
