import { createContext, useContext, useState, useEffect } from "react";
import { UserContextType, UserIsRegisteredContextProps } from "../types/types";

export const UserContext = createContext<UserContextType>({
    isReg: false,
    wantToReg: false,
    regFunc: (e: boolean) => {},
    wantRegFunc: (e: boolean) => {}
})

export function UserIsRegisteredContext({children}: UserIsRegisteredContextProps) {
    const [isReg, setReg] = useState(false)
    const [wantToReg, setUserWantToLog] = useState(false)

    function regFunc(e: boolean): void {
        setReg(e)
    }

    function wantRegFunc(e: boolean) {
        setUserWantToLog(e)
    }

    useEffect(() => {
        function LogLoad() {
            setReg(false)
            setUserWantToLog(false)
        };
        LogLoad()
    }, [])

    return <UserContext.Provider value={{isReg, regFunc, wantToReg, wantRegFunc}}>{children}</UserContext.Provider>
}

export function useRegister() {
    return useContext(UserContext)
}