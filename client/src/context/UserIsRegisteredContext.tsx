import { createContext, useContext, useState, useEffect } from "react";
import { UserContextType, UserIsRegisteredContextProps } from "../types/types";
import themes from "../utils/themes.json"
import { useLocation } from "react-router-dom";

export const UserContext = createContext<UserContextType>({
    isReg: false,
    wantToReg: false,
    selected: [],
    theme: themes[0],
    isPalette: false,
    page: '/',
    chat: 0,
    isColapsible: false,
    userview: '',
    regFunc: () => {},
    wantRegFunc: () => {},
    selectFunc: () => {},
    themeFunc: () => {},
    paletteFunc: () => {},
    pageFunc: () => {},
    chatFunc: () => {},
    collapseFunc: () => {},
    setUserViewFunc: () => {}
})

export function UserIsRegisteredContext({children}: UserIsRegisteredContextProps) {
    const [isReg, setReg] = useState(false)
    const [wantToReg, setUserWantToLog] = useState(false)
    const [isPalette, setPalette] = useState(false)
    const [selected, setSelected] = useState<string[]>([]);
    const [theme, setTheme] = useState<object>(themes[0])
    const [page, setPage] = useState(useLocation().pathname)
    const [chat, setChat] = useState<string | number>(0)
    const [isColapsible, setCollapsible] = useState(false)
    const [userview, setUserView] = useState('')
    const location = useLocation()

    

    function collapseFunc(e: boolean) {
        setCollapsible(e)
    }
    function setUserViewFunc(e: string) {
        setUserView(e)
    }

    function regFunc(e: boolean): void {
        setReg(e)
    }

    function wantRegFunc(e: boolean) {
        setUserWantToLog(e)
    }

    function selectFunc(e: string[]) {
        setSelected(e)
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
            const reg = localStorage.getItem('isReg') == 'true' ? true : false
            const viewUser = localStorage.getItem('viewUser')

            setReg(reg)
            setUserWantToLog(false)
            setTheme(themes[0])
            setPalette(false)
            setPage(location.pathname)
            setCollapsible(false)
            setUserView(viewUser)
        };
        LogLoad()
    }, [])

    useEffect(() => {
        setPage(location.pathname)
    }, [location.pathname])

    return <UserContext.Provider value={{page, pageFunc, userview, setUserViewFunc, isColapsible, collapseFunc, chat, chatFunc, theme, themeFunc, isPalette, paletteFunc, isReg, regFunc, wantToReg, wantRegFunc, selected, selectFunc}}>{children}</UserContext.Provider>
}

export function useRegister() {
    return useContext(UserContext)
}