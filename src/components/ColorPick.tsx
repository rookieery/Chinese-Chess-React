import React, { useState, useCallback, CSSProperties } from "react";
import { Button } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';
import { ChromePicker } from 'react-color';
import { ColorPickProps } from "../views/Settings";

const popover: CSSProperties = {
    position: 'absolute',
    zIndex: 2,
    right: '0',
    top: '32px'
}
const cover: CSSProperties = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
}
const buttonStyle: CSSProperties = {
    position: 'relative'
}
export default function ColorPicker(props: ColorPickProps) {
    const { color, colorChange } = props;
    const [show, setShow] = useState(false);
    const changeShow = useCallback(() => {
        setShow(!show);
    }, [show]);
    const handleClose = useCallback(() => {
        setShow(false);
    }, []);
    return (
        <div style={buttonStyle}>
            <Button shape='circle' icon={<BgColorsOutlined />} onClick={changeShow} />
            {show ?
                <div style={popover}>
                    <div style={cover} onClick={handleClose} />
                    <ChromePicker color={color} onChange={colorChange} />
                </div>
                : null}
        </div>
    )
}