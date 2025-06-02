import { MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useEffect, useRef, useState } from "react"
import { useRegister } from "../context/UserIsRegisteredContext"
import { bot } from "../types/interfaces"
import { autoUpdate, flip, FloatingPortal, offset, shift, size, useFloating } from "@floating-ui/react"
import { useNavigate } from "react-router-dom"


export default function Bot({name, id, description, author, image, chatsCount, tags}: bot) {
    const {isReg, wantRegFunc, theme, pageFunc, chatFunc} = useRegister()
    const [desc, setDescription] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { refs, floatingStyles, update } = useFloating({
    placement: "right-start",
    middleware: [offset(10), 
        flip({
            fallbackPlacements: ['left', 'top-start', 'left-start']
        }), 
        shift({padding: 8}),
        size({
            apply({ availableHeight, elements }) {
                const scrollHeight = elements.floating.scrollHeight;

                const max = Math.min(scrollHeight, availableHeight - 20); // небольшой отступ
                Object.assign(elements.floating.style, {
                maxHeight: `${max}px`,
                overflowY: scrollHeight > availableHeight ? 'auto' : 'hidden',
                });
            },
        }),

        
    ],
    open: desc,
    onOpenChange: setDescription,
    whileElementsMounted: autoUpdate,
    });

    const navigate = useNavigate()

    useEffect(() => {
        if (!refs.reference.current || !refs.floating.current) return;

        return autoUpdate(refs.reference.current, refs.floating.current, update);
    }, [refs.reference, refs.floating, update]);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setDescription(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
        setDescription(false);
        }, 100);
    };
    
    function regCheck() {
        if (!isReg) {
            pageFunc('/chats')
            wantRegFunc(true)
            chatFunc(id)
        } else {
            chatFunc(id)
            navigate('/chats')
        }
    }

    return (
        <div className="relative w-[200px] cursor-pointer" onClick={() => regCheck()}>
            <div 
                ref={refs.setReference}
                key={name} 
                className={`flex flex-row ${theme.options.regButtonColor} rounded-lg overflow-hidden w-[200px] border border-white ${theme.options.hoverBgColor2} transition-all`}
                onMouseEnter={() => setDescription(true)}
                onMouseLeave={() => setDescription(false)}
            >
                <div className="w-full">
                  <div className="h-40"><img className="h-full w-full" src={image} alt={name}></img></div>
                  <div className={`flex flex-col p-3 pb-[5px] h-25 ${theme.options.bgColor2} ${theme.options.textColor2}`}>
                    <p className="text-sm">{name}</p>
                    <p className="text-xs break-words">{description}</p>
                    <div className="flex mt-auto flex-row space-x-2">
                      <Avatar 
                      className='rounded-4xl h-5 w-5'>
                        <AvatarImage className='w-full h-full' src={image} alt={name} />
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                      </Avatar>
                      <p className="text-sm">
                        {author}
                      </p>
                      <MessageCircle className="ml-14 w-[20px] h-[20px]"/>
                      {chatsCount}
                      </div>
                  </div>
                </div>
                {desc ?
                <FloatingPortal>
                    <div 
                        className={`left-[230px] w-[210px] min-h-[250px] pl-4 pt-4 pr-4 pb-2 ${theme.options.bgColor2} ${theme.options.textColor2} border rounded-lg shadow-lg z-10`}
                        ref={refs.setFloating}
                        style={floatingStyles}
                        onMouseMove={handleMouseLeave} 
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="space-y-1">
                            <div>
                                <p className="text-bold">{name}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-bold mt-1">Автор</p>
                                <div className="flex flex-row space-x-1">
                                    <Avatar className='rounded-4xl h-5 w-5'>
                                        <AvatarImage className='w-full h-full' src={image} alt={name} />
                                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                    </Avatar>
                                    <p className="text-sm">
                                        {author}
                                    </p>
                                </div>
                            </div>
                            {!isReg ? <p className="text-sm">Для общения необходимо войти в аккаунт</p> : <></>}
                            <div>
                                <p className="text-bold">Описание</p>
                                <p className="text-sm">{description}</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-bold">Теги</p>
                            <div className="flex flex-row space-x-2 flex-wrap space-y-2">
                                {tags.map((e) => (
                                    <p className={`text-sm ${theme.options.regButtonColor} rounded-lg h-[28px] min-w-[30px] text-center p-1`}>{e}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </FloatingPortal> : <></>}
            </div>
        </div>
    )
}