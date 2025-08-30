import { Card, CardContent } from "@/components/ui/card";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useState } from "react";
import ChatHeader from "./ChatHeader";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey, how's the project going?", sender: "other", time: "2:30 PM" },
    { id: 2, text: "It's going well! Just finished the backend", sender: "me", time: "2:30 PM" },
    { id: 3, text: "Great. Let’s have a meet tomorrow", sender: "other", time: "2:30 PM" },
    { id: 4, text: "Yeah Sure.", sender: "me", time: "2:30 PM" },
  ]);

  const addMessage = (text) => {
    setMessages([
      ...messages,
      { id: messages.length + 1, text, sender: "me", time: "Now" },
    ]);
  };

  return (
    <Card className="flex flex-col flex-1 h-full border-0 ">
      <CardContent className="flex-1 overflow-y-auto p-0 space-y-3">
        <ChatHeader/>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} {...msg}  />
        ))}
      </CardContent >
      <MessageInput onSend={addMessage} />
    </Card>
  );
}
