import React, { useRef, useState, useEffect, useContext } from 'react';
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
    const menuData = useRef([{
        key: 'summarize',
        icon: 'info-circle',
        title: '概括',
        url: '/api/overall',
    }, {
        key: 'trend',
        icon: 'area-chart',
        title: '趋势',
        url: '',
    }]);
    // 点击菜单事件
    const handleClick = (e:{key: string}) => {
        console.log(e);
        setDefaultSelectedKeys([e.key]);
        store.setMenuKey(e.key);
    };
    // 选中菜单更改的回调
    useEffect(() => {
        const item = menuData.current.find(c => c.key === defaultSelectedKeys[0]);
        if (item && item.url && JSON.stringify(store.getData) == '{}') {
            store.setLoading(true);
            axios({
                method: 'GET',
                url: item ? item.url : '',
            }).then((res:any) => {
                store.setData(res.results);
                localStorage.setItem('cache', JSON.stringify(res.results));
                store.setLoading(false);
                console.log(store.getData);
            }).catch(() => {
                    store.setLoading(false);
                    const data = JSON.parse(localStorage.getItem('cache') as string);
                    if (data != null) {
                        message.error(`服务器错误，已使用缓存数据，更新时间${moment(data[0].updateTime).format('YYYY-MM-DD HH:mm:ss')}`);
                        store.setData(data);
                    } else {
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
            {menuData.current.map(c => (
                <Menu.Item key={c.key}>
                    <Icon type={c.icon} />
                    {c.title}
                </Menu.Item>
            ))}
        </Menu>
    )
});

export default MenuApp;
