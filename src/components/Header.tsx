import IconAdd from "./icons/iconAdd";
import IconMenu from "./icons/iconMenu";

type Props = {
    openSidebarClick: () => void;
    newChatClick: () => void;
    title: string;

}


export default function Header({newChatClick, openSidebarClick, title}: Props){
    return (
     <header className="flex justify-between items-center w-full  border-b border-b-gray-600 p-2 md:hidden text-white">
        <div onClick={openSidebarClick}>
            <IconMenu width={24} height={24}/>
        </div>

        <div className="mx-2">
            {title}
        </div>


        <div onClick={newChatClick}>
            <IconAdd width={24} height={24}/>
        </div>
     </header>
    )
}