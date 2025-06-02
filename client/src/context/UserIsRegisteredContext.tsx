import { createContext, useContext, useState, useEffect } from "react";
import { UserContextType, UserIsRegisteredContextProps } from "../types/types";
import themes from "../utils/themes.json"
import { useLocation } from "react-router-dom";

export const UserContext = createContext<UserContextType>({
    isReg: false,
    wantToReg: false,
    isAccount: false,
    selected: [],
    theme: themes[0],
    isPalette: false,
    page: '/',
    chat: 0,
    regFunc: (e: boolean) => {},
    wantRegFunc: (e: boolean) => {},
    selectFunc: (e: string[]) => {},
    accountFunc: (e: boolean) => {},
    themeFunc: (e: object) => {},
    paletteFunc: (e: boolean) => {},
    pageFunc: (e: string) => {},
    chatFunc: (e: number) => {}
})

export function UserIsRegisteredContext({children}: UserIsRegisteredContextProps) {
    const [isReg, setReg] = useState(false)
    const [wantToReg, setUserWantToLog] = useState(false)
    const [isPalette, setPalette] = useState(false)
    const [isAccount, setAccount] = useState(false)
    const [selected, setSelected] = useState<string[]>([]);
    const [theme, setTheme] = useState<object>(themes[0])
    const [page, setPage] = useState(useLocation().pathname)
    const [chat, setChat] = useState(0)
    const location = useLocation()
    const reg = localStorage.getItem('isReg') == 'true' ? true : false

    function regFunc(e: boolean): void {
        setReg(e)
    }

    function wantRegFunc(e: boolean) {
        setUserWantToLog(e)
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

    function pageFunc(e: string) {
        setPage(e)
    }

    function chatFunc(e: number) {
        setChat(e)
    }

    useEffect(() => {
        function LogLoad() {
            setReg(reg)
            setUserWantToLog(false)
            setTheme(themes[0])
            setPalette(false)
            setPage(location.pathname)
        };
        LogLoad()
    }, [])

    useEffect(() => {
        setPage(location.pathname)
    }, [location.pathname])

    return <UserContext.Provider value={{page, pageFunc, chat, chatFunc, theme, themeFunc, isPalette, paletteFunc, isReg, regFunc, wantToReg, wantRegFunc, isAccount, accountFunc, selected, selectFunc}}>{children}</UserContext.Provider>
}

export function useRegister() {
    return useContext(UserContext)
}