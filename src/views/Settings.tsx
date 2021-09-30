import { CSSProperties, useCallback, useState } from "react";
import { Typography, Divider, Switch, Select } from 'antd';
import settings, { languages, LanguageKeys, themes, ThemeKeys } from "../store/setting";
import ColorPicker from "../components/ColorPick";
import home from "../store/home";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

const { Text, Title } = Typography;
const { Option } = Select;

const dividerStyle: CSSProperties = {
    margin: '10px 0'
}

export type ColorPickProps = {
    colorChange: (color: any) => void,
    color: string
}

export default function Setting() {
    const { t } = useTranslation();
    const [blackChessColor, setBlackChessColor] = useState(settings.blackChessColor);
    const [redChessColor, setRedChessColor] = useState(settings.redChessColor);
    const [pointColor, setPointColor] = useState(settings.pointColor);
    const [showPoint, setShowPoint] = useState(settings.isShowPoint);
    const [useSound, setUseSound] = useState(settings.isUseSound);
    const [lang, setLang] = useState(settings.language);
    const [theme, setTheme] = useState(settings.themeKeys);
    const changeBlack = useCallback((color: any) => {
        setBlackChessColor(color.hex);
        settings.blackChessColor = color.hex;
    }, []);
    const changeRed = useCallback((color: any) => {
        setRedChessColor(color.hex);
        settings.redChessColor = color.hex;
    }, []);
    const changePoint = useCallback((color: any) => {
        setPointColor(color.hex);
        settings.pointColor = color.hex;
    }, []);
    const changeShowPoint = useCallback((checked: boolean) => {
        setShowPoint(checked);
        settings.isShowPoint = checked;
    }, []);
    const changeUseSound = useCallback((checked: boolean) => {
        setUseSound(checked);
        settings.isUseSound = checked;
    }, []);
    const themeChange = useCallback((value: ThemeKeys) => {
        setTheme(value);
        settings.themeKeys = value;
        const body = document.getElementsByTagName('body')[0];
        body.setAttribute('data-theme', value);
    }, []);
    const langChange = useCallback((value: LanguageKeys) => {
        i18n.changeLanguage(value);
        setLang(languages[value]);
        settings.language = languages[value];
    }, []);
    return (
        <div className="settings">
            <h1>{t('settings')} {home.version}</h1>
            <Text type="secondary">{t('settings')}</Text>
            <Divider style={dividerStyle} />
            <div className='settings-flex'>
                <Title level={4}>{t('black chess color')}</Title>
                <ColorPicker color={blackChessColor} colorChange={changeBlack} />
            </div>
            <Divider style={dividerStyle} />
            <div className='settings-flex'>
                <Title level={4}>{t('red chess color')}</Title>
                <ColorPicker color={redChessColor} colorChange={changeRed} />
            </div>
            <Divider style={dividerStyle} />
            <div className='settings-flex'>
                <Title level={4}>{t('use sound')}</Title>
                <Switch checked={useSound} onChange={changeUseSound} />
            </div>
            <Divider style={dividerStyle} />
            <div className='settings-flex'>
                <Title level={4}>{t('show point positions')}</Title>
                <Switch checked={showPoint} onChange={changeShowPoint} />
            </div>
            {
                showPoint
                    ? <>
                        <Divider style={dividerStyle} />
                        <div className='settings-flex'>
                            <Title level={4}>{t('point color')}</Title>
                            <ColorPicker color={pointColor} colorChange={changePoint} />
                        </div>
                    </>
                    : null
            }
            <Divider style={dividerStyle} />
            <div className='settings-flex'>
                <Title level={4}>{t('theme style')}</Title>
                <Select defaultValue={theme} style={{ width: 120 }} onChange={themeChange}>
                    {(themes).map((key) => <Option value={key} key={key}>{t(`${key} theme`)}</Option>)}
                </Select>
            </div>
            <Divider style={dividerStyle} />
            <div className='settings-flex'>
                <Title level={4}>{t('lang')}</Title>
                <Select defaultValue={lang as LanguageKeys} style={{ width: 120 }} onChange={langChange}>
                    {(Object.keys(languages) as LanguageKeys[]).map((key) => <Option value={key} key={key}>{languages[key]}</Option>)}
                </Select>
            </div>
        </div>
    );
}