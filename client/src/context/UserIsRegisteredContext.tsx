import { createContext, useContext, useState, useEffect } from "react";
import { UserContextType, UserIsRegisteredContextProps } from "../types/types";
import themes from "../utils/themes.json"

export const UserContext = createContext<UserContextType>({
    isReg: false,
    wantToReg: false,
    isSettings: false,
    isHelp: false,
    isAccount: false,
    selected: [],
    theme: themes[0],
    isPalette: false,
    regFunc: (e: boolean) => {},
    wantRegFunc: (e: boolean) => {},
    settingsFunc: (e: boolean) => {},
    helpFunc: (e: boolean) => {},
    selectFunc: (e: string[]) => {},
    accountFunc: (e: boolean) => {},
    themeFunc: (e: object) => {},
    paletteFunc: (e: boolean) => {}
})

export function UserIsRegisteredContext({children}: UserIsRegisteredContextProps) {
    const [isReg, setReg] = useState(false)
    const [wantToReg, setUserWantToLog] = useState(false)
    const [isSettings, setSettings] = useState(false)
    const [isPalette, setPalette] = useState(false)
    const [isHelp, setHelp] = useState(false)
    const [isAccount, setAccount] = useState(false)
    const [selected, setSelected] = useState<string[]>([]);
    const [theme, setTheme] = useState<object>(themes[0])

    function regFunc(e: boolean): void {
        setReg(e)
    }

    function wantRegFunc(e: boolean) {
        setUserWantToLog(e)
    }

    function settingsFunc(e: boolean) {
        setSettings(e)
    }

    function helpFunc(e: boolean) {
        setHelp(e)
    }

    function selectFunc(e: string[]) {
        setSelected(e)
    }

    function accountFunc(e: boolean) {
        setAccount(e)
    }

    function themeFunc(e: object) {
        setTheme(e)
    }

    function paletteFunc(e: boolean) {
        setPalette(e)
    }

    useEffect(() => {
        function LogLoad() {
            setReg(false)
            setUserWantToLog(false)
            setSettings(false)
            setHelp(false)
            setTheme(themes[0])
            setPalette(false)
        };
        LogLoad()
    }, [])

    return <UserContext.Provider value={{theme, themeFunc, isPalette, paletteFunc, isReg, regFunc, wantToReg, wantRegFunc, isSettings, settingsFunc, isHelp, helpFunc, isAccount, accountFunc, selected, selectFunc}}>{children}</UserContext.Provider>
}

export function useRegister() {
    return useContext(UserContext)
}