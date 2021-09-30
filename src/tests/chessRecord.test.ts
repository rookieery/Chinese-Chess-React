import Gun from '../tools/gun';
import Horse from '../tools/horse';
import role from '../tools/role';
import text from '../tools/text';
import { chessRecord } from "../tools/chessRecord";
const blackHorse = new Horse(text.blackHorse, role.black);
const redGun = new Gun(text.redGun, role.red);
describe('测试棋谱', () => {
    it('红炮平动', () => {
        expect(chessRecord([7, 1], [7, 4], [9, 0], redGun)).toEqual("炮八平五");
    });
    it('黑炮前进', () => {
        expect(chessRecord([0, 1], [2, 2], [9, 0], blackHorse)).toEqual("馬2进3");
    });
});