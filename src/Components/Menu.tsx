import React, { useRef, useState, useEffect, useContext } from 'react';
import { Menu, Icon } from 'antd';
import axios from '@axios';
import StoreContext from '@StoreContext';


const MenuApp = () => {
    // @ts-ignore
    const { store } = useContext(StoreContext);
    // 初始化选中菜单
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState(['summarize']);
    // 初始化菜单数组
    const menuData = useRef([{
        key: 'summarize',
        icon: '',
        title: '概括',
        url: '/api/overall',
    }]);
    // 点击菜单事件
    const handleClick = (e:{key: string}) => {
        console.log(e);
        setDefaultSelectedKeys([e.key]);
    };
    // 选中菜单更改的回调
    useEffect(() => {
        const item = menuData.current.find(c => c.key === defaultSelectedKeys[0]);
        axios({
            method: 'GET',
            url: item ? item.url : '',
        }).then((res:any) => {
            store.setData(res.results);
            console.log(store.getData);
        });
    }, [defaultSelectedKeys, store]);
    return (
        <Menu
            defaultSelectedKeys={defaultSelectedKeys}
            mode={'horizontal'}
            onClick={handleClick}
        >
            {menuData.current.map(c => (
                <Menu.Item key={c.key}>
                    <Icon type="mail" />
                    {c.title}
                </Menu.Item>
            ))}
        </Menu>
    )
};

export default MenuApp;
