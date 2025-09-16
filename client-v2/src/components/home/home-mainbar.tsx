import BotField from "./mainbar-components/bot-field";

type Props = {
    isSidebarOpened: boolean;
    onOpenAuth: (method: string) => void; // новый пропс
};

export default function MainBar({ isSidebarOpened, onOpenAuth }: Props) {
    return <BotField isSidebarOpened={isSidebarOpened} onOpenAuth={onOpenAuth} />;
}