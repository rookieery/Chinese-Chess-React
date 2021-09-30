import settings from "../store/setting";

const url = 'https://www.xiangqiqipu.com/Scripts/game/sounds/';
type SoundName = 'click' | 'move' | 'check' | 'capture' | 'move2' | 'check2' | 'capture2';
export function playSound(name: SoundName) {
    if (settings.isUseSound) {
        new Audio(`${url}${name}.wav`).play();
    }
}