import React, { useEffect, useMemo, useState } from "react";
import { BoardProps } from '../views/Home';
import settings from "../store/setting";
import Point from "./Point";
import home from "../store/home";
import ChessRecord from "./ChessRecord";
import role from "../tools/role";
import { TextValue } from "../tools/text";

export type PointProps = {
    positions: number[][]
};

export type ChessRecordProps = {
    isShowPath: boolean;
    dataList: string[];
    changeShowPath: (flag: boolean) => void;
};

type ChessOptions = {
    className: string;
    id: string;
    style: React.CSSProperties;
    key: number;
    text: TextValue;
}

export default function Board(props: BoardProps) {
    const { isStart, chessBoard, isShowPath, changeShowPath } = props;
    const [isRender, setIsRender] = useState(false);
    useEffect(() => {
        chessBoard.render = () => {
            setIsRender(!isRender);
        };
    }, [chessBoard, isRender]);
    const chesses = useMemo(() => {
        const board = chessBoard.idBoard;
        const res = [];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                const chess = chessBoard.board[i][j];
                const id = board[i][j];
                if (chess === role.empty) {
                    continue;
                }
                const style: React.CSSProperties = {
                    color: chess.type === 'red' ? settings.redChessColor : settings.blackChessColor,
                    marginTop: `${1 + (11.49 * i)}%`,
                    marginLeft: `${0.5 + (11.56 * j)}%`
                };
                res.push({
                    className: `chess ${id === chessBoard.chessSelectId ? 'border' : ''}`,
                    id: id.toString(),
                    style,
                    key: id,
                    text: chess.text,
                });
            }
        }
        // 保证react更精准的更新棋子dom
        res.sort((a, b) => a.key - b.key);
        // console.log(res);
        return res;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chessBoard, isRender]);
    return (
        <div id='board' className="board" onClick={(e) => chessBoard.clickHandler(e)}>
            {isStart ? chesses.map((option: ChessOptions) => (
                <div className={option.className} id={option.id} style={option.style} key={option.key}>{option.text}</div>
            )) : <></>}
            {home.isShowPoint && isStart && settings.isShowPoint ? <Point positions={chessBoard.positions} /> : <></>}
            <ChessRecord isShowPath={isShowPath} changeShowPath={changeShowPath} dataList={chessBoard.chessRecords} />
        </div>
    );
}