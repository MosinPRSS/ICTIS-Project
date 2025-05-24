import { createContext, useContext, useState, useEffect } from "react";
import { UserContextType, UserIsRegisteredContextProps } from "../types/types";

export const UserContext = createContext<UserContextType>({
    isReg: false,
    wantToReg: false,
    isSettings: false,
    isHelp: false,
    regFunc: (e: boolean) => {},
    wantRegFunc: (e: boolean) => {},
    settingsFunc: (e: boolean) => {},
    helpFunc: (e: boolean) => {}
})

export function UserIsRegisteredContext({children}: UserIsRegisteredContextProps) {
    const [isReg, setReg] = useState(false)
    const [wantToReg, setUserWantToLog] = useState(false)
    const [isSettings, setSettings] = useState(false)
    const [isHelp, setHelp] = useState(false)

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

    useEffect(() => {
        function LogLoad() {
            setReg(false)
            setUserWantToLog(false)
            setSettings(false)
            setHelp(false)
        };
        LogLoad()
    }, [])

    return <UserContext.Provider value={{isReg, regFunc, wantToReg, wantRegFunc, isSettings, settingsFunc, isHelp, helpFunc}}>{children}</UserContext.Provider>
}

export function useRegister() {
    return useContext(UserContext)
}