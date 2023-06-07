import { Chat } from "@/types/Chat"
import { useState } from "react";
import IconChatLeft from "./icons/iconChatLeft";
import IconTrash from "./icons/iconTrash";
import IconEdit3 from "./icons/iconEdit";
import IconClose from "./icons/iconClose";
import IconCheck from "./icons/iconCheck";

type Props = {
    chatItem: Chat;
    active: boolean;
    onClick: (id: string) => void;
    onDelete: (id: string) => void
    onEdit: (id: string, newTitle: string) => void
}


export default function SidebarChatButton({ active, chatItem, onClick, onDelete, onEdit }: Props) {

    const [deleting, setDeleting] = useState(false);
    const [editing, setEditing] = useState(false);
    const [titleInput, setTitleInput] = useState(chatItem.title)


    function handleClickButtton() {
        if(!deleting || !editing){
            onClick(chatItem.id)
        }
    }

    function handleConfirmButton() {
        if (deleting) onDelete(chatItem.id)

        if (editing && titleInput.trim() !== '') {
            onEdit(chatItem.id, titleInput.trim());
        }

        setDeleting(false);
        setEditing(false)
    }

    function handleCancelButton() {
        setDeleting(false)
        setEditing(false)
    }
    return (
        <div onClick={handleClickButtton} className={`flex items-center rounded-md p-3 text-sm cursor-pointer hover: bg-gray-500/10  ${active ? 'bg-gray-500/20' : 'bg-transparent'} `}>
            <div className="mr-3 ">
                {!deleting && <IconChatLeft width={16} height={16} />}

            </div>

            <div className="flex-1 text-sm overflow-x-hidden ">
                {editing &&
                    <input
                        className="w-full bg-transparent text-sm outline-none border border-blue-500"
                        type="text"
                        value={titleInput}
                        onChange={e => setTitleInput(e.target.value)}
                    />
                }

                {
                    !editing &&

                    <div className="border border-transparent truncate">
                        {!deleting && chatItem.title}
                        {deleting && `Delete "${chatItem.title}"`}
                    </div>
                }
            </div>

            {
                active && !editing && !deleting &&
                <div className="flex">
                    <div onClick={() => setEditing(true)} className="cursor-pointer mx-1 opacity-60 hover:opacity-100">
                        <IconEdit3 width={16} height={16} />
                    </div>


                    <div onClick={() => setDeleting(true)} className="cursor-pointer mx-1 opacity-60 hover:opacity-100">
                        <IconTrash width={16} height={16} />
                    </div>
                </div>
            }



            {
                (editing || deleting) &&
                <div className="flex">
                    <div onClick={handleConfirmButton} className="cursor-pointer mx-1 opacity-60 hover:opacity-100">
                        <IconCheck width={16} height={16} />
                    </div>


                    <div onClick={handleCancelButton} className="cursor-pointer mx-1 opacity-60 hover:opacity-100">
                        <IconClose width={16} height={16} />
                    </div>
                </div>
            }



        </div>
    )
}