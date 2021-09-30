export type TextValue = '車' | '馬' | '炮' | '卒' | '兵' | '士' | '仕' | '象' | '相' | '將' | '帥' | '';
type Text = {
    [key in string]: TextValue
}
const texts: Text = {
    blackCar: '車',
    redCar: '車',
    blackHorse: '馬',
    redHorse: '馬',
    blackGun: '炮',
    redGun: '炮',
    blackSoldier: '卒',
    redSoldier: '兵',
    blackOfficial: '士',
    redOfficial: '仕',
    blackPhase: '象',
    redPhase: '相',
    blackGeneral: '將',
    redGeneral: '帥',
    empty: '',
};
export default texts;