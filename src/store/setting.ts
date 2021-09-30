export type LanguageKeys = 'en' | 'zh';
export type ThemeKeys = 'default' | 'dark';
type Languages = {
    [keys in LanguageKeys]: string
}
export const languages: Languages = {
    en: 'English',
    zh: '简体中文'
};
export const themes: ThemeKeys[] = ['default', 'dark']
// 应该保存在redux里面（数据绑定）TODO
const settings = {
    isShowPoint: true,
    isUseSound: true,
    pointColor: '#1198bc',
    blackChessColor: '#000',
    redChessColor: 'red',
    isReverse: false,
    themeKeys: themes[0],
    language: languages.zh
};
export default settings;