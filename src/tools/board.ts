import Car from './car';
import Horse from './horse';
import Gun from './gun';
import Soldier from './soldier';
import Phase from './phase';
import Official from './official';
import General from './general';
import role, { roleEmpty, RoleEmpty } from './role';
import text from './text';
import settings from '../store/setting';
import home from '../store/home';
import { chessRecord } from './chessRecord';
import isAbsoluteKill from './specialRule';
import { playSound } from './playSound';
export type killRule = Car | Gun;
export type BoardCore = killRule | Horse | Soldier | Phase | Official | General;
type BoardText = BoardCore | RoleEmpty;
type Chess = [number, number, BoardText];
export type BoardType = BoardText[][];
class Board {
    step: number;
    readyPlay: boolean;
    chessSelectId: number;
    startPosition: number[];
    endPosition: number[];
    positions: number[][];
    chessRecords: string[];
    historyRecord: BoardType[];
    historyIds: number[][][];
    redCar: Car;
    blackCar: Car;
    redHorse: Horse;
    blackHorse: Horse;
    redGun: Gun;
    blackGun: Gun;
    redGeneral: General;
    blackGeneral: General;
    redSoldier: Soldier;
    blackSoldier: Soldier;
    redPhase: Phase;
    blackPhase: Phase;
    redOfficial: Official;
    blackOfficial: Official;
    empty: RoleEmpty;
    board: BoardType;
    idBoard: number[][];
    constructor() {
        // ts中变量只能在constructor里初始化
        this.step = 1;
        this.readyPlay = false;
        this.chessSelectId = -1;
        this.startPosition = [];
        this.endPosition = [];
        this.idBoard = [];
        // 记录当前棋子能够执行的所有位置
        this.positions = [];
        this.chessRecords = [];
        this.historyRecord = [];
        this.historyIds = [];
        this.redCar = new Car(text.redCar, role.red);
        this.blackCar = new Car(text.blackCar, role.black);
        this.redHorse = new Horse(text.redHorse, role.red);
        this.blackHorse = new Horse(text.blackHorse, role.black);
        this.redGun = new Gun(text.redGun, role.red);
        this.blackGun = new Gun(text.blackGun, role.black);
        this.redGeneral = new General(text.redGeneral, role.red);
        this.blackGeneral = new General(text.blackGeneral, role.black);
        this.redSoldier = new Soldier(text.redSoldier, role.red);
        this.blackSoldier = new Soldier(text.blackSoldier, role.black);
        this.redPhase = new Phase(text.redPhase, role.red);
        this.blackPhase = new Phase(text.blackPhase, role.black);
        this.redOfficial = new Official(text.redOfficial, role.red);
        this.blackOfficial = new Official(text.blackOfficial, role.black);
        this.empty = roleEmpty;
        this.board = settings.isReverse
            ? [
                [this.redCar, this.redHorse, this.redPhase, this.redOfficial, this.redGeneral, this.redOfficial, this.redPhase, this.redHorse, this.redCar],
                [this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty],
                [this.empty, this.redGun, this.empty, this.empty, this.empty, this.empty, this.empty, this.redGun, this.empty],
                [this.redSoldier, this.empty, this.redSoldier, this.empty, this.redSoldier, this.empty, this.redSoldier, this.empty, this.redSoldier],
                [this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty],
                [this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty],
                [this.blackSoldier, this.empty, this.blackSoldier, this.empty, this.blackSoldier, this.empty, this.blackSoldier, this.empty, this.blackSoldier],
                [this.empty, this.blackGun, this.empty, this.empty, this.empty, this.empty, this.empty, this.blackGun, this.empty],
                [this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty],
                [this.blackCar, this.blackHorse, this.blackPhase, this.blackOfficial, this.blackGeneral, this.blackOfficial, this.blackPhase, this.blackHorse, this.blackCar],
            ]
            : [
                [this.blackCar, this.blackHorse, this.blackPhase, this.blackOfficial, this.blackGeneral, this.blackOfficial, this.blackPhase, this.blackHorse, this.blackCar],
                [this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty],
                [this.empty, this.blackGun, this.empty, this.empty, this.empty, this.empty, this.empty, this.blackGun, this.empty],
                [this.blackSoldier, this.empty, this.blackSoldier, this.empty, this.blackSoldier, this.empty, this.blackSoldier, this.empty, this.blackSoldier],
                [this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty],
                [this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty],
                [this.redSoldier, this.empty, this.redSoldier, this.empty, this.redSoldier, this.empty, this.redSoldier, this.empty, this.redSoldier],
                [this.empty, this.redGun, this.empty, this.empty, this.empty, this.empty, this.empty, this.redGun, this.empty],
                [this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty],
                [this.redCar, this.redHorse, this.redPhase, this.redOfficial, this.redGeneral, this.redOfficial, this.redPhase, this.redHorse, this.redCar],
            ];
        this.historyRecord.push(this.deepClone(this.board));
        this.initIdBoard();
    }

    initIdBoard() {
        let id = 1;
        for (let i = 0; i < this.board.length; i++) {
            const ids = [];
            for (let j = 0; j < this.board[0].length; j++) {
                const chess = this.board[i][j];
                if (chess === role.empty) {
                    ids.push(0);
                    continue;
                }
                ids.push(id);
                id++;
            }
            this.idBoard.push(ids);
        }
        this.historyIds.push(this.deepClone(this.idBoard));
    }

    getBackward(arr1: BoardType, arr2: BoardType) {
        let start: Chess = [0, 0, arr1[0][0]];
        let end: Chess = [0, 0, arr1[0][0]];;
        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
                if (arr1[i][j] !== arr2[i][j]) {
                    if (arr1[i][j] !== role.empty && arr2[i][j] === role.empty) {
                        start = [i, j, arr1[i][j]];
                    } else {
                        end = [i, j, arr1[i][j]];
                    }
                }
            }
        }
        return [start, end];
    }

    backwardHandler() {
        if (this.step === 1) {
            return;
        }
        const [start, end] = this.getBackward(this.historyRecord[this.historyRecord.length - 2], this.historyRecord[this.historyRecord.length - 1]);
        //更新棋盘
        this.historyRecord.pop();
        this.board[start[0]][start[1]] = start[2];
        this.board[end[0]][end[1]] = end[2];
        this.historyIds.pop();
        const arr = this.historyIds[this.historyIds.length - 1];
        this.idBoard[start[0]][start[1]] = arr[start[0]][start[1]];
        this.idBoard[end[0]][end[1]] = arr[end[0]][end[1]];
        this.clearBoard();
        this.step--;
        this.chessRecords.pop();
        this.render();
    }

    getChessPosition(id: string) {
        for (let i = 0; i < this.idBoard.length; i++) {
            for (let j = 0; j < this.idBoard[0].length; j++) {
                const chessId = this.idBoard[i][j];
                if (chessId.toString() === id) {
                    return [i, j];
                }
            }
        }
        return [];
    }

    isSimilar(position: number[]) {
        return (this.board[position[0]][position[1]].type === role.red && this.step % 2 === 1)
            || (this.board[position[0]][position[1]].type === role.black && this.step % 2 === 0)
    }

    invalidPlayer(position: number[]) {
        const play = this.board[position[0]][position[1]];
        if (play === role.empty) {
            return false;
        }
        if (this.isSimilar(position)) {
            return false;
        }
        if ((this.startPosition.length > 0) && (play.type !== this.board[this.startPosition[0]][this.startPosition[1]].type)) {
            return false;
        }
        return true;
    }

    includes(position: number[], positions: number[][]) {
        for (let i = 0; i < positions.length; i++) {
            if (positions[i][0] === position[0] && positions[i][1] === position[1]) {
                return true;
            }
        }
        return false;
    }

    canDown(position: number[]) {
        // 判断是否是同类
        if (this.invalidPlayer(position)) {
            return false;
        }
        if (!this.includes(position, this.positions)) {
            return false;
        }
        return true;
    }

    removeCanDown() {
        this.positions = [];
    }

    clearBoard() {
        this.removeSelect();
        this.removeCanDown();
    }

    removeSelect() {
        this.chessSelectId = -1;
    }

    setSelect() {
        this.chessSelectId = this.idBoard[this.startPosition[0]][this.startPosition[1]];
    }

    showCanDown(position: number[]) {
        const play = this.board[position[0]][position[1]];
        this.positions = (play as BoardCore).rule(position, this.board);
    }

    getEmptyPosition(offsetX: number, offsetY: number, clientWidth: number, clientHeight: number) {
        const colIndex = Math.round((offsetX / clientWidth - 0.0374) * 100 / 11.56);
        const rowIndex = Math.round((offsetY / clientHeight * 1.116 - 0.039) * 100 / 11.49);
        return [rowIndex, colIndex];
    }

    changeBoard() {
        if (this.board[this.endPosition[0]][this.endPosition[1]] === this.empty) {
            // 交换棋盘的位置信息
            [this.board[this.startPosition[0]][this.startPosition[1]], this.board[this.endPosition[0]][this.endPosition[1]]]
                = [this.board[this.endPosition[0]][this.endPosition[1]], this.board[this.startPosition[0]][this.startPosition[1]]];
            // 交换id棋盘的位置信息
            [this.idBoard[this.startPosition[0]][this.startPosition[1]], this.idBoard[this.endPosition[0]][this.endPosition[1]]]
                = [this.idBoard[this.endPosition[0]][this.endPosition[1]], this.idBoard[this.startPosition[0]][this.startPosition[1]]];
        } else {
            this.board[this.endPosition[0]][this.endPosition[1]] = this.board[this.startPosition[0]][this.startPosition[1]];
            this.board[this.startPosition[0]][this.startPosition[1]] = this.empty;
            this.idBoard[this.endPosition[0]][this.endPosition[1]] = this.idBoard[this.startPosition[0]][this.startPosition[1]];
            this.idBoard[this.startPosition[0]][this.startPosition[1]] = 0;
        }
    }

    deepClone<T>(arr: T[][]): T[][] {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            const tmp = [];
            for (let j = 0; j < arr[0].length; j++) {
                tmp.push(arr[i][j]);
            }
            result.push(tmp);
        }
        return result;
    }

    render() {
    }

    gameOver() {

    }

    playChess(playerPosition: number[]) {
        this.clearBoard();
        this.endPosition = playerPosition;
        // 记录历史打谱
        this.chessRecords.push(chessRecord(this.startPosition, this.endPosition,
            settings.isReverse ? [0, 9] : [9, 0], (this.board[this.startPosition[0]][this.startPosition[1]] as BoardCore)));
        this.changeBoard();
        this.readyPlay = false;
        this.step++;
        if (isAbsoluteKill(playerPosition, this.board, this.step)) {
            this.render();
            setTimeout(() => {
                this.gameOver();
            }, 500);
            return;
        }
        playSound(this.step % 2 === 0 ? 'capture' : 'capture2');
        this.historyRecord.push(this.deepClone(this.board));
        this.historyIds.push(this.deepClone(this.idBoard));
        home.isShowPoint = false;
        this.render();
    }

    selectChess(flag: boolean, playerPosition: number[]) {
        playSound('click');
        if (this.readyPlay && !flag) {
            this.clearBoard();
            // 清空上次的选择
        }
        // 如果是不同类
        if (!this.isSimilar(playerPosition)) {
            home.isShowPoint = true;
            this.render();
            return;
        }
        // 如果是同类
        this.startPosition = playerPosition;
        this.setSelect();
        this.readyPlay = true;
        // 获取可以落子的位置
        this.showCanDown(playerPosition);
        home.isShowPoint = true;
        this.render();
    }

    clickChess(playerPosition: number[]) {
        const flag = this.canDown(playerPosition);
        // 已经选中了一个棋子并即将落子
        if (this.readyPlay && flag) {
            this.playChess(playerPosition);
        } else {// （更换）选中的棋子
            this.selectChess(flag, playerPosition);
        }
    }

    clickEmpty(flag: boolean, playerPosition: number[]) {
        // 在canDown之后
        this.clearBoard();
        if (!flag) {
            home.isShowPoint = false;
            this.render();
            return;
        }
        this.endPosition = playerPosition;
        // 记录历史打谱
        this.chessRecords.push(chessRecord(this.startPosition, this.endPosition,
            settings.isReverse ? [0, 9] : [9, 0], (this.board[this.startPosition[0]][this.startPosition[1]] as BoardCore)));
        this.changeBoard();
        this.step++;
        if (isAbsoluteKill(playerPosition, this.board, this.step)) {
            this.render();
            setTimeout(() => {
                this.gameOver();
            }, 500);
            return;
        }
        playSound(this.step % 2 === 0 ? 'move' : 'move2');
        this.historyRecord.push(this.deepClone(this.board));
        this.historyIds.push(this.deepClone(this.idBoard));
        home.isShowPoint = false;
        this.render();
    }

    clickHandler = (e: any) => {
        // 点击棋子
        if (e.target.id !== '' && e.target.id !== 'board') {
            // 获取当前棋子的坐标
            const playerPosition = this.getChessPosition(e.target.id);
            if (this.invalidPlayer(playerPosition)) {
                return;
            }
            this.clickChess(playerPosition);

        } else if (e.target.id === 'board') {// 点击棋盘
            if (this.readyPlay) {
                // 获取空白位置的坐标
                const playerPosition = this.getEmptyPosition(e.nativeEvent.offsetX, e.nativeEvent.offsetY, e.target.clientWidth, e.target.clientHeight);
                const flag = this.canDown(playerPosition);
                this.readyPlay = false;
                this.clickEmpty(flag, playerPosition);
            }
        }
    }
}

export default Board;