import React, { useState, useEffect, useContext } from 'react';
import { Menu, Icon, message } from 'antd';
import axios from '@axios';
import { observer } from 'mobx-react-lite'
import StoreContext from '@StoreContext';
import moment from 'moment';


const MenuApp = observer(() => {
    const { store } = useContext(StoreContext);
    // 初始化选中菜单
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState(['summarize']);
    // 初始化菜单数组
    const menuData = [{
        key: 'summarize',
        icon: 'info-circle',
        title: '概括',
        url: '/api/overall',
        axiosIf: JSON.stringify(store.getData) === '{}',
    }, {
        key: 'trend',
        icon: 'area-chart',
        title: '趋势',
        url: '',
        axiosIf: false,
    }, {
        key: 'map',
        icon: 'pie-chart',
        title: '地图',
        url: '/api/area',
        axiosIf: JSON.stringify(store.getMapData) === '[{}]',
    }];
    // 点击菜单事件
    const handleClick = (e:{key: string}) => {
        console.log(e);
        setDefaultSelectedKeys([e.key]);
        store.setMenuKey(e.key);
    };
    // 选中菜单更改的回调
    useEffect(() => {
        const item = menuData.find(c => c.key === defaultSelectedKeys[0]);
        if (item && item.url && item.axiosIf) {
            store.setLoading(true);
            axios({
                method: 'GET',
                url: item ? item.url : '',
            }).then((res:any) => {
                switch (defaultSelectedKeys[0]) {
                    case 'summarize':
                        store.setData(res.results);
                        localStorage.setItem('cache', JSON.stringify(res.results));
                        break;
                    case 'map':
                        store.setMapData(res.results);
                        localStorage.setItem('mapCache', JSON.stringify(res.results));
                        break;
                    default:
                        break;
                }
                store.setLoading(false);
            }).catch(() => {
                    store.setLoading(false);
                    let data;
                    switch (defaultSelectedKeys[0]) {
                        case 'summarize':
                            data = JSON.parse(localStorage.getItem('cache') as string);
                            if (data != null) {
                                message.error(`服务器错误，已使用缓存数据，更新时间${moment(data[0].updateTime).format('YYYY-MM-DD HH:mm:ss')}`);
                                store.setData(data);
                            }
                            break;
                        case 'map':
                            data = JSON.parse(localStorage.getItem('mapCache') as string);
                            if (data !== null) {
                                message.error(`服务器错误，已使用缓存数据，更新时间${moment(data[0].updateTime).format('YYYY-MM-DD HH:mm:ss')}`);
                                store.setData(data);
                            }
                            break;
                        default:
                            break;
                    }
                    if (!data) {
                        message.error('服务器错误，请稍后再试');
                    }
                }
            );
        }
    }, [defaultSelectedKeys, store]);
    return (
        <Menu
            defaultSelectedKeys={defaultSelectedKeys}
            mode={'horizontal'}
            onClick={handleClick}
        >
            {menuData.map(c => (
                <Menu.Item key={c.key}>
                    <Icon type={c.icon} />
                    {c.title}
                </Menu.Item>
            ))}
        </Menu>
    )
});

export default MenuApp;
