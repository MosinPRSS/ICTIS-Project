import { useEffect, useRef, useState } from "react";
import { useRegister } from "../context/UserIsRegisteredContext"
import { DonutIcon, PaperclipIcon } from "lucide-react";
import { Message } from "../types/types";
import BotsData from "../utils/data.json"
import {user} from '../utils/data'
import { chatProps } from "../types/interfaces";

function getCurrentTime() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
}

export default function Chat({chat}: chatProps) {
    const {theme} = useRegister()
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: 'Здравствуй! Я твой виртуальный собеседник. О чём поговорим?', isUser: false, timestamp: getCurrentTime() }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    let bot = BotsData.find((e) => e.id == chat)
    useEffect(() => {
        bot = BotsData.find((e) => e.id == chat)
    }, [chat])

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
        <div className={`flex flex-col w-full ${theme.options.bgColor}`}>
            {/* Основной контейнер чата */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Шапка чата (фиксированная высота) */}
                <div className={`flex items-start border-b p-3 flex-shrink-0 ${theme.options.mgColor}`}>
                    <div className={`ml-[2%] flex h-8 w-10 items-center justify-center rounded-full ${theme.options.bgColor} text-white`}>
                        <img src={bot?.image} className="w-10 h-10 outline rounded-full"/>
                    </div>
                    <h3 className="ml-2 text-xl font-semibold">{bot.name}</h3>
                </div>

                {/* Область сообщений (гибкая, со скроллом) */}
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
                        <button className="ml-2 cursor-pointer flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-200">
                            <PaperclipIcon />
                        </button>
                        <button
                            onClick={sendMessage}
                            className="ml-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-indigo-700 text-white hover:bg-indigo-800"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                            </button>
                        </div>
                </div>
            </div>
        </div>
    )
}