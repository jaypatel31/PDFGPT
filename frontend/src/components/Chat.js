import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateChat, resetChat, resetStatus } from "../stateSlice/chatSlice";
import { toast } from "react-toastify";

const Chat = () => {
    const [chatArray, setChatArray] = useState([])
    const [currentChat, setCurrentChat] = useState("")
    const [loading, setLoading] = useState(false)
    const {chatStatus, chatInfo, chatError, chatHistory} = useSelector(state => state.chat);
    let dispatch = useDispatch();
    let messageEl= React.createRef();

    useEffect(()=>{
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
              const { currentTarget: target } = event;
              target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
          }
    },[])
    

    useEffect(()=>{
        if(chatInfo){
            setCurrentChat("")
            console.log(chatInfo,chatArray)
            setChatArray([...chatArray, {
                message: chatInfo,
                sender: "ai"
            }])
            setLoading(false)
            dispatch(resetChat())
        }
    },[chatInfo])

    useEffect(()=>{
        if(chatError){
            setLoading(false)
            toast.error(chatError)
            let arr =  [...chatArray];
            arr.pop()
            setChatArray(arr)
            dispatch(resetStatus())
        }
    },[chatError])

    const sendChat = (e) => {
        e.preventDefault();
        if(currentChat){
            setChatArray([...chatArray, {
                message: currentChat,
                sender: "user"
            }])
            setLoading(true)
            dispatch(generateChat({question: currentChat, chatHistory: chatHistory}))
        }else{
            toast.error("Please enter a message to send.")
        }
    }

    return(
        <div class="flex-1 p:2 sm:p-6 justify-between flex flex-col chat_container">
            <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                <div class="relative flex items-center space-x-4">
                    <div class="relative">
                        <span class="absolute text-green-500 right-0 bottom-0">
                        <svg width="20" height="20">
                            <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                        </svg>
                        </span>
                    <img src="https://cdn-icons-png.flaticon.com/512/8943/8943377.png" alt="" class="w-10 sm:w-16 h-10 sm:h-16 rounded-full"/>
                    </div>
                    <div class="flex flex-col leading-tight">
                        <div class="text-2xl mt-1 flex items-center">
                        <span class="text-gray-700 mr-3">ChatGPT - 3.5</span>
                        </div>
                        <span class="text-lg text-gray-600">AI</span>
                    </div>
                </div>
            </div>
            <div id="messages" class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch h-full" ref={messageEl}>
                {
                    chatArray && chatArray.length>0 ?(
                        <>
                            {
                                chatArray.map((chat, index) => (
                                    <div class="chat-message" key={index}>
                                        <div class={`flex items-end ${chat.sender==="ai"?"":"justify-end"}`}>
                                            <div class={`flex flex-col space-y-2 text-xs max-w-lg mx-2 order-2 items-${chat.sender==="ai"?"start":"end"} text-left`}>
                                            <div style={{lineBreak:"anywhere"}}><span class={`px-4 py-2 rounded-lg inline-block rounded-bl-none text-sm ${chat.sender==="ai"?"bg-gray-300 text-gray-600":"bg-blue-600 text-white"}`}>{chat.message}</span></div>
                                            </div>
                                            <img src={`${chat.sender==="ai"?"https://cdn-icons-png.flaticon.com/512/8943/8943377.png":"https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3BmLWljb240LWppcjIwNjItcG9yLWwtam9iNzg4LnBuZw.png"} `} alt="My profile" class="w-6 h-6 rounded-full order-1"/>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    ):(
                        "Please enter a message to start the chat."
                    )
                }
                {/* <div class="chat-message">
                    <div class="flex items-end">
                        <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">Can be verified on any platform using docker</span></div>
                        </div>
                        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" class="w-6 h-6 rounded-full order-1"/>
                    </div>
                </div>
                <div class="chat-message">
                    <div class="flex items-end justify-end">
                        <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                        <div><span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Your error message says permission denied, npm global installs must be given root privileges.</span></div>
                        </div>
                        <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" class="w-6 h-6 rounded-full order-2"/>
                    </div>
                </div> */}
            </div>
            <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                <div >
                    <form onSubmit={sendChat} class="relative flex">
                        <input type="text" placeholder="Write your message!" class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3" value={currentChat} onChange={(e)=>setCurrentChat(e.target.value)}/>
                    
                    <div class="absolute right-0 items-center inset-y-0 sm:flex">
                        
                        <button type="submit" class="inline-flex items-center justify-center rounded-lg px-2 sm:px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none" disabled={loading}>
                            {
                                loading && (
                                    <svg className="animate-spin h-5 w-5 mr-3" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path fill="#FFF"  d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" class="spinner_ajPY"/></svg>
                                )
                            }
                        <span class="font-bold sm:block hidden">Send</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 ml-2 transform rotate-90">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                        </button>
                    </div>
                    </form>
                </div>
            </div>
            </div>
    )
}

export default Chat;