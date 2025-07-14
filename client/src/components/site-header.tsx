import { DonutIcon, InspectionPanelIcon, TreeDeciduousIcon } from "lucide-react"
import { Separator } from "./ui/separator"
import { SidebarTrigger } from "./ui/sidebar"
import { Button } from "./ui/button"
import { useRegister } from "../context/UserIsRegisteredContext"
import Theme from "../utils/themes.json"
import { useEffect, useRef, useState } from "react"

const ThemeIcon: [string, React.ReactElement][] = [
  ['Violet', <DonutIcon className="size-4 sm:size-5" />], 
  ['Green', <TreeDeciduousIcon className="size-4 sm:size-5" />], 
  ['Gray', <InspectionPanelIcon className="size-4 sm:size-5" />]
]

export function SiteHeader() {
  const { theme, themeFunc, collapseFunc, isColapsible } = useRegister()
  const [isPalette, setPalette] = useState(false)
  const paletteRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.body.className = theme.options.bgColor
  }, [theme])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (paletteRef.current && !paletteRef.current.contains(event.target as Node) && !buttonRef.current?.contains(event.target as Node)) {
        setPalette(false)
      }
    }

    if (isPalette) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isPalette])
  
  function getIcon(themeName: string): React.ReactElement | undefined {
    const foundIcon = ThemeIcon.find(([name]) => name === themeName)
    return foundIcon ? foundIcon[1] : undefined
  }

  function switchTheme(name: string) {
    switch (name) {
      case 'Violet':
        themeFunc(Theme[0])
        setPalette(false)
        break;
      case 'Green':
        themeFunc(Theme[1])
        setPalette(false)
        break;
      case 'Gray':
        themeFunc(Theme[2])
        setPalette(false)
        break;
    }
  }

  return (
    <header className={`fixed z-10 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 w-full flex h-12 shrink-0 items-center gap-2 h-s border-b transition-[width,height] ease-linear bg-cover ${theme.options.mgColor}`}>
      <div className="flex w-full items-center gap-1 px-3 sm:px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger  
          onClick={() => collapseFunc(!isColapsible)} 
          className={`-ml-1 cursor-pointer ${theme.options.hoverBgColor} ${theme.options.hoverTextColor}`} 
        />
        <Separator
          orientation="vertical"
          className="mx-1 sm:mx-2 data-[orientation=vertical]:h-4"
        />
        <Button 
          className={`fixed right-0 mr-3 sm:mr-6 cursor-pointer ${theme.options.hoverBgColor} ${theme.options.hoverTextColor}`} 
          onClick={() => setPalette((isPalette) => !isPalette)} 
          ref={buttonRef}
        >
          {getIcon(theme.theme)}
        </Button>
        {isPalette && (
          <div 
            className={`fixed p-2 space-y-2 flex flex-col justify-center top-[50px] right-[15px] sm:right-[25px] ${theme.options.bgColor3} ${theme.options.textColor} ${theme.options.bgBorderColor} rounded-sm`}
            ref={paletteRef}
          >
            {Theme.map((e) => (
              <Button 
                key={e.theme}
                className={`cursor-pointer border ${theme.options.hoverBgColor2} ${theme.options.hoverTextColor2} text-xs sm:text-sm`}
                onClick={() => switchTheme(e.theme)}
              >
                <p>{e.theme}</p>
                {getIcon(e.theme)}
              </Button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
