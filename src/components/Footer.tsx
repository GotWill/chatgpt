import ChatMessageInput from "./ChatMessageInput";

type Props = {
    disabled: boolean;
    onSendMessage: (message: string) => void;
}

export default function Footer({onSendMessage, disabled}: Props){
    return (
            <footer className="w-full border-t border-t-gray-600 p-2">
                <div className="max-w-4xl m-auto">
                    <ChatMessageInput
                     disabled={disabled}
                     onSend={onSendMessage}
                    />
                </div>

                <div className="pt-3 text-center text-xs text-gray-300">
                    Feito por Mano Will.
                </div>
            </footer>
    )
}