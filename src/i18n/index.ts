import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// 层级嵌套如何处理
const resources = {
    en: {
        translation: {
            'title': 'Chinese Chess',
            'settings': 'Settings',
            'start': 'START',
            'surrender': 'SURRENDER',
            'change': 'Change',
            'home': 'Home',
            'about': 'About',
            'lang': 'Language',
            'black chess color': 'Black Chess Color:',
            'red chess color': 'Red Chess Color:',
            'show point positions': 'Show Point Positions:',
            'use sound':'Use Sound:',
            'theme style': 'Theme Style:',
            'default theme': 'Default Theme',
            'dark theme': 'Dark Theme',
            'point color': 'Point Color:',
            'reverse board': 'Reverse Board:',
            'reverse rule': 'This operation can only be used before the start of the game',
            'chooseOffensiveTitle': 'Choose Offensive',
            'chooseOffensiveBody': 'Who is to go on the offensive?',
            'me': 'Me',
            'computer': 'Computer',
            'game start': 'Game Start',
            'red win': 'Red Win',
            'black win': 'Black Win',
            'giveTitle': 'Give up?',
            'giveBody': 'Are you sure to give up?',
            'ok': 'OK',
            'cancel': 'Cancel',
            'show': 'Show',
            'rounds': 'Rounds:'
        }
    },
    zh: {
        translation: {
            'title': '中国象棋',
            'settings': '设置',
            'start': '开始',
            'surrender': '认输',
            'change': '更新',
            'home': '首页',
            'about': '关于',
            'lang': '语言',
            'black chess color': '黑方棋子颜色：',
            'red chess color': '红方棋子颜色：',
            'show point positions': '显示落子提示点：',
            'use sound':'使用音效：',
            'theme style': '主题样式：',
            'default theme': '默认主题',
            'dark theme': '暗黑主题',
            'point color': '提示点颜色：',
            'reverse board': '交换棋盘位置：',
            'reverse rule': '此操作仅限于开局前使用',
            'chooseOffensiveTitle': '选择先手',
            'chooseOffensiveBody': '谁执红方？',
            'me': '我',
            'computer': '电脑',
            'game start': '游戏开始',
            'red win': '红方赢',
            'black win': '黑方赢',
            'giveTitle': '认输?',
            'giveBody': '你确定认输吗?',
            'ok': '确认',
            'cancel': '取消',
            'show': '查看',
            'rounds': '回合数：'
        }
    },
};
i18n.use(initReactI18next).init({
    resources,
    lng: 'zh', //设置当前语言
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
        escapeValue: false // react already safes from xss
    }
});
export default i18n;