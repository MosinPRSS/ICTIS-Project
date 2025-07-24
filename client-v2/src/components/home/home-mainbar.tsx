import BotField from "./mainbar-components/bot-field";

type Props = {
    isSidebarOpened: boolean;
};

export default function MainBar({ isSidebarOpened }: Props) {
    return <BotField isSidebarOpened={isSidebarOpened} />;
}
