import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { MenuProps } from "../App";
import { Menu, Dropdown, Button } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export default function AppMenu(props: MenuProps) {
    const { t } = useTranslation();
    const [key, setKey] = useState('');
    const { routers } = props;
    const changeMenu = useCallback((e: any) => {
        setKey(e.key);
    }, []);
    const setContent = () => (
        <Menu onClick={changeMenu} selectedKeys={[key]}>
            {routers.map(([label]) => <Menu.Item key={label.toString()}>
                <Link to={`/${label}`}>{t(label.toString())}</Link>
            </Menu.Item>)}
        </Menu>
    )
    return (
        <>
            <Dropdown overlay={setContent} placement="bottomRight">
                <Button className={'app-menu'} icon={<AppstoreOutlined />} />
            </Dropdown>
        </>
    )
}