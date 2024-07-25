import React from "react";
import { ChatRoom } from "../../../config/store";

interface ChatListItemProps {
    item: ChatRoom;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ item }) => {
    return (
        <div className="p-4 border-b border-gray-600">
            <h2 className="text-white">{item.chat_room_name}</h2>
            <p className="text-gray-400">{item.tree_name}</p>
        </div>
    );
};

export default ChatListItem;
