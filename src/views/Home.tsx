import { Modal, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Board from '../components/Board';
import { useState, useCallback, CSSProperties, useEffect } from "react";
import home from '../store/home';
import { useTranslation } from 'react-i18next';
import settings from "../store/setting";
import BigText from '../components/BigText';
import ChessBoard from '../tools/board';


export type BoardProps = {
    isStart: boolean;
    chessBoard: ChessBoard;
    isShowPath: boolean;
    changeShowPath: (flag: boolean) => void;
}

export type BigTextProps = {
    text: string;
    isIn: boolean;
}

type confirmOptions = {
    title: string;
    content: string;
    cancelText: string;
    okText: string;
};

const bodyStyle: CSSProperties = {
    textAlign: 'center'
};

const divStyle: CSSProperties = {
    flex: '1',
    margin: '5px',
    height: '40px',
};

const btnStyle: CSSProperties = {
    width: '100%',
    height: '100%',
}

const { confirm } = Modal;

function showConfirm(options: confirmOptions, okHandler: () => void, cancelHandler: () => void) {
    confirm({
        title: options.title,
        content: options.content,
        icon: null,
        bodyStyle,
        centered: true,
        cancelText: options.cancelText,
        okText: options.okText,
        onOk() {
            okHandler()
        },
        onCancel() {
            cancelHandler()
        },
    });
}

let chessBoard = new ChessBoard();

export default function Home() {
    const { t } = useTranslation();
    const [isStart, setIsStart] = useState(home.isStart);
    const [isEnd, setIsEnd] = useState(home.isEnd);
    const [text, setText] = useState('');
    const [isIn, setIsIn] = useState(home.isStart);
    const [isShowPath, setIsShowPath] = useState(home.isShowPath);
    const peoplePlay = useCallback(() => {
        settings.isReverse = true;
        chessBoard = new ChessBoard();
        setIsIn(true);
        setText(t('game start'));
    }, [t]);
    const computerPlay = useCallback(() => {
        settings.isReverse = false;
        chessBoard = new ChessBoard();
        setIsIn(true);
        setText(t('game start'));
    }, [t]);
    const okHandler = useCallback(() => {
        setIsStart(false);
        home.isStart = false;
        home.isEnd = true;
        setIsEnd(true);
        setIsIn(true);
        setText(chessBoard.step % 2 === 0 ? t('red win') : t('black win'));
    }, [t]);
    const cancelHandler = useCallback(() => {
        // console.log('取消');
    }, []);
    const startGame = useCallback(() => {
        const options = {
            title: t('chooseOffensiveTitle'),
            content: t('chooseOffensiveBody'),
            cancelText: t('me'),
            okText: t('computer'),
        };
        home.isEnd = false;
        setIsEnd(false);
        showConfirm(options, peoplePlay, computerPlay);
    }, [computerPlay, peoplePlay, t]);
    useEffect(() => {
        if (isIn) {
            setTimeout(() => {
                setIsIn(false);
                setTimeout(() => {
                    if (isEnd) {
                        // chessBoard = new ChessBoard();
                    } else {
                        home.isStart = true;
                        setIsStart(true);
                        chessBoard.gameOver = () => {
                            okHandler();
                        };
                    }
                }, 1000);
            }, 1000);
        }
    }, [isEnd, isIn, okHandler]);
    const gameOver = useCallback(() => {
        // console.log('game over');
        const options = {
            title: t('giveTitle'),
            content: t('giveBody'),
            cancelText: t('cancel'),
            okText: t('ok'),
        };
        showConfirm(options, okHandler, cancelHandler);
    }, [cancelHandler, okHandler, t]);
    const changeShowPath = useCallback((flag: boolean) => {
        home.isShowPath = flag;
        setIsShowPath(flag);
    }, []);
    return (
        <div className="home">
            <h1>{t('title')} {home.version}</h1>
            <Board isStart={isStart} chessBoard={chessBoard} isShowPath={isShowPath} changeShowPath={changeShowPath} />
            <div className="button-box">
                <div style={divStyle}>
                    <Button type="primary" style={btnStyle} onClick={startGame} disabled={isStart}>{t('start')}</Button>
                </div>
                <div style={divStyle}>
                    <Button type="primary" style={btnStyle} onClick={gameOver} disabled={!isStart} danger>{t('surrender')}</Button>
                </div>
                <div style={divStyle}>
                    <Button type="primary" style={btnStyle} onClick={() => changeShowPath(true)} disabled={!isStart || isShowPath}>{t('show')}</Button>
                </div>
                <div style={divStyle}>
                    <Button type="primary" style={btnStyle} onClick={() => chessBoard.backwardHandler()} icon={<LeftOutlined />}
                        disabled={!isStart}></Button>
                </div>
                <div style={divStyle}>
                    <Button type="primary" style={btnStyle} icon={<RightOutlined />} disabled></Button>
                </div>
            </div>
            <BigText text={text} isIn={isIn} />
        </div>
    );
}