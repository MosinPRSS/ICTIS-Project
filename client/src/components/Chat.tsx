import { useEffect, useRef, useState } from "react";
import { useRegister } from "../context/UserIsRegisteredContext"
import { SendIcon } from "lucide-react";
import { Message } from "../types/types";
import { bot } from "../types/interfaces";

function getCurrentTime() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
}

export default function Chat({bot}: bot) {
    const {theme} = useRegister()
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: 'Здравствуй! Я твой виртуальный собеседник. О чём поговорим?', isUser: false, timestamp: getCurrentTime() }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const sendMessage = () => {
        if (!inputMessage.trim()) return;

        const newUserMessage: Message = {
        id: Date.now(),
        text: inputMessage,
        isUser: true,
        timestamp: getCurrentTime()
        };

        setMessages([...messages, newUserMessage]);
        setInputMessage('');

        setTimeout(() => {
        const botResponses = [
            `Я понял ваш запрос: '${inputMessage}'. О чём ещё поговорим?`,
            "Спасибо за ваше сообщение!",
        ];
        const botMessage: Message = {
            id: Date.now() + 1,
            text: botResponses[Math.floor(Math.random() * botResponses.length)],
            isUser: false,
            timestamp: getCurrentTime()
        };
        setMessages(prev => [...prev, botMessage]);
        }, 1000);
    };
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
        sendMessage();
        }
    };
    
    return (
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                    <div className="flex flex-row space-x-2">
                        {!message.isUser && <img src={bot?.image} className="w-10 h-10 rounded-full outline mt-auto mb-3"/>}
                        <div
                        key={message.id}
                        className={`mb-3 flex max-w-[40%] break-all whitespace-normal w-fit animate-fadeIn items-start gap-2 rounded-xl p-3 ${
                            message.isUser
                            ? `ml-auto flex-row-reverse ${theme.options.bgColor2} text-black`
                            : 'bg-gray-200 text-gray-800'
                        }`}
                        >
                            {message.text}
                        </div>

                    </div>
                ))}
                <div ref={messagesEndRef} />
                </div>

                {/* Поле ввода (фиксированная высота) */}
                <div className={`p-3 ${theme.options.bgColor3} border-1 rounded-sm flex-shrink-0`}>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Напишите сообщение..."
                            className="flex-1 rounded-full border-none px-4 py-3 focus:outline-none"
                        />
                        <button
                            onClick={sendMessage}
                            className={`${theme.options.bgColor} ml-2 flex h-10 w-10 mr-3 outline cursor-pointer items-center justify-center rounded-full ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} hover:scale-130`}
                        >
                            <SendIcon />
                        </button>
                    </div>
                </div>
            </div>        
    )
}