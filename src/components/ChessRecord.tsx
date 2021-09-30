import { Drawer, List, Typography } from "antd";
import { CSSProperties, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ChessRecordProps } from "./Board";

const drawerStyle: CSSProperties = {
    position: 'absolute',
};

const listStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-start',
};

export default function ChessRecord(props: ChessRecordProps) {
    const { isShowPath, changeShowPath, dataList } = props;
    const { t } = useTranslation();
    const renderItem = useCallback((item, index) => {
        const textStyle: CSSProperties = {
            visibility: (index % 2 === 0) ? 'visible' : 'hidden',
            color: 'gold',
            display: 'block',
            width: '30px',
        };
        return (
            <List.Item style={listStyle}>
                <Typography.Text style={textStyle}>
                    {`${Math.floor(index / 2) + 1}. `}</Typography.Text>
                {item}
            </List.Item>);
    }, []);
    return (
        <>
            <Drawer title={`${t('rounds')}${Math.round(dataList.length / 2)}`} placement='left' visible={isShowPath}
                getContainer={false} width='14rem' style={drawerStyle} onClose={() => changeShowPath(false)}>
                <List size='small' dataSource={dataList} renderItem={renderItem} />
            </Drawer>
        </>
    )
}