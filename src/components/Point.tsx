import React, { useCallback } from "react";
import settings from "../store/setting";
import { PointProps } from './Board';

export default function Point(props: PointProps) {
    const { positions } = props;
    const renderPoints = useCallback(() => {
        const res = [];
        for (let i = 0; i < positions.length; i++) {
            const rowIndex = positions[i][0];
            const colIndex = positions[i][1];
            const style: React.CSSProperties = {
                backgroundColor: settings.pointColor,
                marginTop: `${3.5 + (11.55 * rowIndex)}%`,
                marginLeft: `${3 + (11.55 * colIndex)}%`
            };
            res.push(
                <div className='point' style={style} key={i}></div>
            )
        }
        return res;
    }, [positions])
    return (
        <>
            {renderPoints()}
        </>
    );
}