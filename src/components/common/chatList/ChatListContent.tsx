import { useChatStore } from "../../../config/store";
import ChatListItem from "./ChatListItem";

const ChatListContent = () => {
    const { chatList } = useChatStore();

    return (
        <div className="select-none overflow-y-auto w-fit flex flex-col">
            {Array.isArray(chatList) &&
                chatList.map((item) => <ChatListItem key={item.chat_room_uuid} item={item} />)}
        </div>
    );
};

export default ChatListContent;
