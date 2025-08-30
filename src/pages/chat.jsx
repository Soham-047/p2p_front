import Sidebar from "../components/chat/SideBar";
import ChatBox from "../components/chat/ChatBox";

export default function ChatLayout() {
    return (
        <div className="flex  flex-1 h-screen bg-white shadow-lg rounded-lg px-10">
        <Sidebar />
        <ChatBox />
      </div>
      
    );
  }
  
