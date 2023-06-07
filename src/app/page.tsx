'use client'

import ChatArea from "@/components/ChatArea";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SidebarChatButton from "@/components/SidebarChatButton";
import { Chat } from "@/types/Chat";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";



export default function Home() {

  const [sidebarOpened, setSidebarOpened] = useState(false)
  const [chatList, setChatList] = useState<Chat[]>([])
  const [chatActiveId, setChatActiveId] = useState<string>('')
  const [chatActive, setChatActive] = useState<Chat>()
  const [AIloading, setAIloading] = useState(false)



  useEffect(() => {
    setChatActive(chatList.find(item => item.id === chatActiveId))
  }, [chatActiveId, chatList])


  useEffect(() => {
    if (AIloading) getAIResponse()


  }, [AIloading])

  const openSidebar = () => setSidebarOpened(true)
  const closeSidebar = () => setSidebarOpened(false)


  function getAIResponse() {
    setTimeout(() => {
      let chatListClone = [...chatList]
      let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId)

      if (chatIndex > -1) {
        chatListClone[chatIndex].message.push({
          id: uuidV4(),
          author: 'ai',
          body: 'Opa, tudo bem?'
        })
      }


      setChatList(chatListClone)
      setAIloading(false)

    }, 2000)
  }




  function handleClearConversations() {
    if (AIloading) return;

    setChatActiveId('')
    setChatList([])
  }

  function handleNewChat() {
    if (AIloading) return;


    setChatActiveId('')
    closeSidebar()
  }

  function handleSendMessage(message: string) {
    if (!chatActiveId) {
      let newChatId = uuidV4();

      setChatList([{
        id: newChatId,
        title: message,
        message: [
          {
            id: uuidV4(),
            author: 'me',
            body: message
          }
        ]
      }, ...chatList])

      setChatActiveId(newChatId)
    } else {
      let chatListClone = [...chatList]

      let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId)
      chatListClone[chatIndex].message.push({
        id: uuidV4(),
        author: 'me',
        body: message

      })

      setChatList(chatListClone)
    }

    setAIloading(true)
  }

  function handleSelectChat(id: string) {
    if (AIloading) return;

    let item = chatList.find(item => item.id === id);

    if (item) setChatActiveId(item.id)
    setSidebarOpened(false)
    closeSidebar()
  }

  function handleDeleteChat(id: string) {
    let chatListClone = [...chatList];

    let chatIndex = chatListClone.findIndex(item => item.id === id);

    chatListClone.splice(chatIndex, 1);

    setChatList(chatListClone)
    setChatActiveId('')

  }

  function handleEditChat(id: string, newtitle: string) {
    if (newtitle) {

      let chatListClone = [...chatList];

      let chatIndex = chatListClone.findIndex(item => item.id === id);

      chatListClone[chatIndex].title = newtitle;
      setChatList(chatListClone)
    }
  }

  return (
    <main className="flex min-h-screen bg-gpt-gray">
      <Sidebar
        open={sidebarOpened}
        onClose={closeSidebar}
        onClear={handleClearConversations}
        onNewChat={handleNewChat}
      >
        {
          chatList.map((chat) => {
            return <SidebarChatButton
              key={chat.id}
              chatItem={chat}
              active={chat.id === chatActiveId}
              onClick={handleSelectChat}
              onDelete={handleDeleteChat}
              onEdit={handleEditChat}
            />
          })
        }

      </Sidebar>


      <section className="flex flex-col w-full">

        <Header
          openSidebarClick={openSidebar}
          title={chatActive ? chatActive.title : 'Nova conversa'}
          newChatClick={handleNewChat}
        />


        <ChatArea
          chat={chatActive}
          loading={AIloading}
        />


        <Footer
          disabled={AIloading}
          onSendMessage={handleSendMessage}
        />

      </section>
    </main>
  )
}
