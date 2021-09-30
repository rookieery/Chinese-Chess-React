import { BoardCore } from "./board";
import role from "./role";
import texts from './text';

const redTexts = ['九', '八', '七', '六', '五', '四', '三', '二', '一'];
const blackTexts = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const actions = ['平', '进', '退'];

// 车炮兵帅一类
// 马士相一类
export function chessRecord(startPosition: number[], endPosition: number[], targetPosition: number[], player: BoardCore) {
    const { type, text } = player;
    const [redStart, blackStart] = targetPosition;
    let action = '';
    let res = '';
    if (type === role.red) {
        if (startPosition[0] > endPosition[0]) {
            action = redStart === 0 ? actions[2] : actions[1];
            res = (text === texts.redCar || text === texts.redGun || text === texts.redSoldier || text === texts.redGeneral)
                ? `${text}${redTexts[startPosition[1]]}${action}${redTexts[redTexts.length - (startPosition[0] - endPosition[0])]}`
                : `${text}${redTexts[startPosition[1]]}${action}${redTexts[endPosition[1]]}`;
        } else if (startPosition[0] < endPosition[0]) {
            action = redStart === 0 ? actions[1] : actions[2];
            res = (text === texts.redCar || text === texts.redGun || text === texts.redSoldier || text === texts.redGeneral)
                ? `${text}${redTexts[startPosition[1]]}${action}${redTexts[redTexts.length - (endPosition[0] - startPosition[0])]}`
                : `${text}${redTexts[startPosition[1]]}${action}${redTexts[endPosition[1]]}`;
        } else {
            action = actions[0];
            res = `${text}${redTexts[startPosition[1]]}${action}${redTexts[endPosition[1]]}`;
        }
    } else if (type === role.black) {
        if (startPosition[0] > endPosition[0]) {
            action = blackStart === 0 ? actions[2] : actions[1];
            res = (text === texts.blackCar || text === texts.blackGun || text === texts.blackSoldier || text === texts.blackGeneral)
                ? `${text}${blackTexts[startPosition[1]]}${action}${blackTexts[startPosition[0] - endPosition[0] - 1]}`
                : `${text}${blackTexts[startPosition[1]]}${action}${blackTexts[endPosition[1]]}`;
        } else if (startPosition[0] < endPosition[0]) {
            action = blackStart === 0 ? actions[1] : actions[2];
            res = (text === texts.blackCar || text === texts.blackGun || text === texts.blackSoldier || text === texts.blackGeneral)
                ? `${text}${blackTexts[startPosition[1]]}${action}${blackTexts[endPosition[0] - startPosition[0] - 1]}`
                : `${text}${blackTexts[startPosition[1]]}${action}${blackTexts[endPosition[1]]}`;
        } else {
            action = actions[0];
            res = `${text}${blackTexts[startPosition[1]]}${action}${blackTexts[endPosition[1]]}`;
        }
    } else {

    }
    return res;
}