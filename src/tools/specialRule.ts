import { message } from "antd";
import settings, { languages } from "../store/setting";
import { BoardCore, BoardType, killRule } from "./board";
import Car from "./car";
import Gun from "./gun";
import Horse from "./horse";
import { playSound } from "./playSound";
import role, { roleEmpty, RoleValue } from "./role";
import text from "./text";

function includes(position: number[], positions: number[][]) {
    for (let i = 0; i < positions.length; i++) {
        if (positions[i][0] === position[0] && positions[i][1] === position[1]) {
            return true;
        }
    }
    return false;
}

function getGeneralPosition(type: RoleValue, board: BoardType) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if ((type === role.black && board[i][j].text === text.redGeneral) ||
                (type === role.red && board[i][j].text === text.blackGeneral)) {
                return [i, j];
            }
        }
    }
    return [];
}

function isWarnGeneral(playType: RoleValue, board: BoardType) {
    const generalPosition = getGeneralPosition(playType, board);
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            const targetPlay = board[i][j];
            if (playType === role.red) {
                if (targetPlay.type !== role.red) {
                    continue;
                }
                if (targetPlay.text === text.redOfficial || targetPlay.text === text.redPhase) {
                    continue;
                }
            } else {
                if (targetPlay.type !== role.black) {
                    continue;
                }
                if (targetPlay.text === text.blackOfficial || targetPlay.text === text.blackPhase) {
                    continue;
                }
            }
            const willPositions = targetPlay.rule([i, j], board);
            if (includes(generalPosition, willPositions)) {
                return true;
            }
        }
    }
    return false;
}

//?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
function canGo(i: number, j: number, target: number[], board: BoardType) {
    // ????????????????????????????????????????????????????????????????????????
    const oldEle = board[target[0]][target[1]];
    board[target[0]][target[1]] = board[i][j];
    board[i][j] = roleEmpty;
    const result = isWarnGeneral((oldEle.type as RoleValue), board);
    // ??????
    board[i][j] = board[target[0]][target[1]];
    board[target[0]][target[1]] = oldEle;
    return !result;
}

function absoluteKill(position: number[], allPositions: number[][], board: BoardType) {
    // ????????????????????????????????????
    const play = board[position[0]][position[1]];
    const generalPosition = getGeneralPosition((play.type as RoleValue), board);
    const generalMoves = (board[generalPosition[0]][generalPosition[1]] as BoardCore).rule(generalPosition, board);
    // ????????????????????????????????????
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            const chess = board[i][j];
            if (chess === roleEmpty || chess.type !== board[position[0]][position[1]].type) {
                continue;
            }
            const positions = (chess.text === text.redCar || chess.text === text.redGun || chess.text === text.blackCar || chess.text === text.blackGun)
                ? (chess as killRule).killRule([i, j], board)
                : (chess as killRule).rule([i, j], board);
            for (let k = 0; k < generalMoves.length; k++) {
                if (includes(generalMoves[k], positions)) {
                    generalMoves.splice(k, 1);
                    k--;
                }
            }
        }
    }
    if (generalMoves.length > 0) {
        return false;
    }
    // ?????????????????????????????????????????????
    if (allPositions.length === 1) {
        const target = allPositions[0];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                const chess = board[i][j];
                if (chess === roleEmpty || chess.type === board[target[0]][target[1]].type) {
                    continue;
                }
                const positions = (chess as BoardCore).rule([i, j], board);
                if (includes(target, positions) && canGo(i, j, target, board)) {
                    return false;
                }
            }
        }
    }
    // ????????????????????????????????????????????????????????????????????????
    const disturbPositions = [];
    for (let i = 0; i < allPositions.length; i++) {
        const chessPosition = allPositions[i];
        const chess = board[chessPosition[0]][chessPosition[1]];
        if (chess.text === text.blackCar || chess.text === text.redCar) {
            const positions = (chess as Car).getDisturb([chessPosition[0], chessPosition[1]], generalPosition);
            disturbPositions.push([...positions]);
        } else if (chess.text === text.blackGun || chess.text === text.redGun) {
            const positions = (chess as Gun).getDisturb([chessPosition[0], chessPosition[1]], generalPosition, board);
            disturbPositions.push([...positions]);
        } else if (chess.text === text.blackHorse || chess.text === text.redHorse) {
            const positions = (chess as Horse).getDisturb([chessPosition[0], chessPosition[1]], board);
            disturbPositions.push([...positions]);
        }
    }
    let targetPositions = [];
    let doubleKill = false;
    for (let i = 0; i < disturbPositions.length; i++) {
        let flag = false;
        const positions = disturbPositions[i];
        if (positions.length === 0) {
            return true;
        }
        for (let j = 0; j < positions.length; j++) {
            const targetPosition = positions[j];
            if (includes(targetPosition, targetPositions)) {
                doubleKill = true;
                flag = true;
                targetPositions = [];
                break;
            } else {
                targetPositions.push([...targetPosition]);
            }
        }
        if (flag) {
            break;
        }
    }
    if (doubleKill) {
        const tmpPositions = [];
        for (let i = 0; i < disturbPositions.length; i++) {
            const positions = disturbPositions[i];
            for (let j = 0; j < positions.length; j++) {
                const targetPosition = positions[j];
                if (includes(targetPosition, tmpPositions)) {
                    targetPositions.push([...targetPosition]);
                } else {
                    tmpPositions.push([...targetPosition]);
                }
            }
        }
    }
    // ?????????????????????????????????
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            const chess = board[i][j];
            if (chess === roleEmpty || chess.type === board[position[0]][position[1]].type) {
                continue;
            }
            const positions = (chess as BoardCore).rule([i, j], board);
            for (let k = 0; k < targetPositions.length; k++) {
                if (includes(targetPositions[k], positions)) {
                    return false;
                }
            }
        }
    }
    return true;
}

function warnGeneral(position: number[], board: BoardType) {
    const play = board[position[0]][position[1]];
    // ????????????????????????????????????????????????????????????
    const positions = [];
    const generalPosition = getGeneralPosition((play.type as RoleValue), board);
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            const targetPlay = board[i][j];
            if (play.type === role.red) {
                if (targetPlay.type !== role.red) {
                    continue;
                }
                if (targetPlay.text === text.redOfficial || targetPlay.text === text.redPhase) {
                    continue;
                }
            } else {
                if (targetPlay.type !== role.black) {
                    continue;
                }
                if (targetPlay.text === text.blackOfficial || targetPlay.text === text.blackPhase) {
                    continue;
                }
            }
            // allPositions.push([i, j]);
            const willPositions = targetPlay.rule([i, j], board);
            if (includes(generalPosition, willPositions)) {
                positions.push([i, j]);
            }
        }
    }
    return positions;
}

export default function isAbsoluteKill(position: number[], board: BoardType, step: number = 0) {
    const result = warnGeneral(position, board);
    if (result.length !== 0 && absoluteKill(position, result, board)) {
        const text = settings.language === languages.zh ? '??????' : 'Absolute Kill';
        message.warn(text, 3);
        return true;
    } else if (result.length !== 0) {
        const text = settings.language === languages.zh ? '??????' : 'Warn General';
        message.warn(text, 1);
        playSound(step % 2 === 0 ? 'check' : 'check2');
        return false;
    }
    return false;
}