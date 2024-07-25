import React from "react";
import { ChatRoom } from "../../../config/store";
import ChatListItem from "./ChatListItem";

interface ChatListContentProps {
    chatList: ChatRoom[];
}

const ChatListContent: React.FC<ChatListContentProps> = ({ chatList }) => {
    return (
        <div className="select-none overflow-y-auto w-fit flex flex-col">
            {chatList.map((item) => (
                <ChatListItem key={item.chat_room_uuid} item={item} />
            ))}
        </div>
    );
};

export default ChatListContent;
