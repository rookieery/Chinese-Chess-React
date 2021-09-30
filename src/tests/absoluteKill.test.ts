import Car from '../tools/car';
import Gun from '../tools/gun';
import Horse from '../tools/horse';
import Soldier from '../tools/soldier';
import role, { roleEmpty } from '../tools/role';
import isAbsoluteKill from '../tools/specialRule';
import text from '../tools/text';
import General from '../tools/general';
import Official from '../tools/official';
import Phase from '../tools/phase';

const redCar = new Car(text.redCar, role.red);
const blackCar = new Car(text.blackCar, role.black);
const redHorse = new Horse(text.redHorse, role.red);
const blackHorse = new Horse(text.blackHorse, role.black);
const redGun = new Gun(text.redGun, role.red);
const blackGun = new Gun(text.blackGun, role.black);
const redGeneral = new General(text.redGeneral, role.red);
const blackGeneral = new General(text.blackGeneral, role.black);
const redSoldier = new Soldier(text.redSoldier, role.red);
const blackSoldier = new Soldier(text.blackSoldier, role.black);
const redPhase = new Phase(text.redPhase, role.red);
const blackPhase = new Phase(text.blackPhase, role.black);
const redOfficial = new Official(text.redOfficial, role.red);
const blackOfficial = new Official(text.blackOfficial, role.black);
const empty = roleEmpty;

describe('测试绝杀', () => {
    it('重跑绝杀', () => {
        const board =
            [
                [blackCar, empty, blackPhase, blackOfficial, blackGeneral, blackOfficial, blackPhase, blackHorse, blackCar],
                [empty, empty, empty, empty, empty, empty, empty, empty, empty],
                [empty, blackGun, blackHorse, empty, empty, empty, empty, blackGun, empty],
                [blackSoldier, empty, empty, empty, redGun, empty, empty, empty, blackSoldier],
                [empty, empty, blackSoldier, empty, empty, empty, blackSoldier, empty, empty],
                [empty, empty, empty, empty, redGun, empty, empty, empty, empty],
                [redSoldier, empty, redSoldier, empty, redSoldier, empty, redSoldier, empty, redSoldier],
                [empty, empty, empty, empty, empty, empty, empty, empty, empty],
                [empty, empty, empty, empty, empty, empty, empty, empty, empty],
                [redCar, redHorse, redPhase, redOfficial, redGeneral, redOfficial, redPhase, redHorse, redCar],
            ];
        expect(isAbsoluteKill([5, 4], board)).toBeTruthy();
    })
});