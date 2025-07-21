import { useState } from 'react';
import Button from "./sidebar-components/button";
import ExpandButton from "./sidebar-components/expand";

export default function SideBar() {
    const [is_opened, setIsOpened] = useState(true);

    return (
        <div 
            className={`
                flex flex-col bg-gray-400 h-full p-5 transition-all duration-300 overflow-hidden
                ${is_opened ? 'w-1/6' : 'w-1/16'}
            `}
        >
            <ExpandButton 
                is_opened={is_opened} 
                onClick={() => setIsOpened(!is_opened)} 
            />
            
            <div className="flex-1">
                <Button
                    name="Главная"
                    url="/"
                    is_activated={true}
                    img_url={"/homyak.jpg"}
                    is_collapsed={!is_opened}
                />
                <Button
                    name="Главная"
                    url="/"
                    is_activated={false}
                    img_url={"/homyak.jpg"}
                    is_collapsed={!is_opened}
                />
            </div>
        </div>
    );
}