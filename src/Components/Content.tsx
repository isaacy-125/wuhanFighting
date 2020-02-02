import React, {useContext} from 'react';
import StoreContext from '@StoreContext';
import { observer } from 'mobx-react-lite'
import { Descriptions, Badge } from 'antd';

const Item:any = Descriptions.Item;

const ContentApp = observer(() => {
    const { store } = useContext(StoreContext);
    const data = store.getData[0] || {};
    console.log(data);
    return (
        <Descriptions bordered>
            <Item label="感染源">{data.infectSource}</Item>
        </Descriptions>
    )
});

export default ContentApp;
