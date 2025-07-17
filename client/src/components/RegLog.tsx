import { TriangleIcon, X } from "lucide-react";
import { LoginForm } from "./ui/login-form";
import dashboardBackground from "../../public/images/LoginPageBackGroundDarkTheme1900x1200.jpg"
import { useRegister } from "../context/Context";
import { useSidebar } from "./ui/sidebar";

export default function RegLog() {
    const {wantRegFunc, theme} = useRegister()
    const {isMobile} = useSidebar()
    return (
        <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${theme.options.bgColor} rounded-2xl p-6 w-full m-10 relative`}>
            <div className="flex flex-row items-center justify-center gap-6 bg-muted p-3 md:p-10">
                {!isMobile ? <div className="flex flex-1 rounded-2xl outline w-full h-full min-h-[517px]">
                    <img className="rounded-2xl" src={dashboardBackground}></img>
                </div> : <></>}
                <div className={`flex flex-col gap-6 max-w-[350px] ${theme.options.textColor}`}>
                    <a href="#" className="flex items-center gap-2 text-3xl self-center font-medium">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <TriangleIcon className="size-5" />
                        </div>
                    ARI-ai
                    </a>
                    <LoginForm />
                </div>
            </div>
            <button 
              onClick={() => wantRegFunc(false)}
              className={`cursor-pointer absolute top-8 right-8 outline-2 rounded-xl ${theme.options.hoverTextColor} ${theme.options.textColor}`}
            >
              <X size={30} />
            </button>
          </div>
        </div>
    )
}