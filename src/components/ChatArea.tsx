import { Chat } from "@/types/Chat"
import ChatPlaceholder from "./ChatPlaceholder";
import ChatMessage from "./ChatMessage";
import ChatMessageLoading from "./ChatMessageLoading";

type Props = {
    chat: Chat | undefined;
    loading: boolean;
}


export default function ChatArea({ chat, loading}: Props) {
    return (
        <section className="flex-auto h- overflow-y-scroll">
            {!chat && <ChatPlaceholder />}

            {
            chat && chat.message.map((message) => {
                return <ChatMessage 
                  key={message.id}
                  item={message}
                />
            })}

            {loading && <ChatMessageLoading/> }
        </section>
    )
}