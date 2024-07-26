import { useState, useRef, useEffect } from "react";
import { useChatStore, ChatRoom, TreeItem } from "../../../config/store";
import ButtonDefault from "../button/ButtonDefault";
import { IconClose, IconSelectArrow } from "../../../config/IconData";
import ModalListItem from "./ModalListItem";
import { twMerge as tw } from "tailwind-merge";
import useVerify from "../../../hook/useVerify";
import { treeApi } from "../../../api";
import dayjs from "dayjs";
import { CreateChatRoom } from "../../../api/chat";

interface ModalCreateChatProps {
    onClose: () => void;
    onAddChatRoom: (newChatRoom: ChatRoom) => void;
}

const ModalCreateChat = ({ onClose, onAddChatRoom }: ModalCreateChatProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedTree, setSelectedTree] = useState<TreeItem | null>(null);
    const [chatRoomName, setChatRoomName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);
    const { checkLoginStatus } = useVerify();
    const { treeList, setTreeList } = useChatStore();

    const getTreeList = async () => {
        const { data: accountResponse } = await treeApi.getTreeDataAll();
        const formattedTreeList = accountResponse.map((tree: TreeItem) => ({
            tree_uuid: tree.tree_uuid,
            tree_name: tree.tree_name,
            created_at: dayjs(tree.created_at).format("YYYY-MM-DD"),
        }));
        setTreeList(formattedTreeList);
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        getTreeList();
    }, []);

    const createChatHandler = async () => {
        if (chatRoomName.trim() === "") {
            setErrorMessage("이름을 입력해주세요.");
            return;
        }

        if (!selectedTree) {
            setErrorMessage("나무를 선택해주세요.");
            return;
        }

        await checkLoginStatus();

        const newChatRoomData = {
            chat_room_name: chatRoomName,
            tree_uuid: selectedTree.tree_uuid,
        };

        try {
            //const newChatRoom = await CreateChatRoom(newChatRoomData);
            //onAddChatRoom(newChatRoom);
            onClose();
        } catch (error) {
            console.error("Error creating chat room:", error); // 에러 로그
            setErrorMessage("채팅 방 생성에 실패했습니다.");
        }
    };

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleItemClick = (item: TreeItem) => {
        setSelectedTree(item);
        setIsDropdownOpen(false);
    };

    return (
        <div
            className={tw(
                "p-5 bg-gray-800 text-white w-[360px]",
                "relative border border-gray-600"
            )}
        >
            <h3 className="font-title leading-5 text-gray-200">대화 분석방 생성</h3>
            <input
                type="text"
                placeholder="이름을 지어주세요."
                value={chatRoomName}
                onChange={(e) => {
                    setChatRoomName(e.target.value);
                    setErrorMessage("");
                }}
                className={tw(
                    "mt-6 border-b outline-none border-gray-600",
                    "h-10 w-full bg-gray-800 placeholder:text-gray-600 focus:border-white"
                )}
            />
            {errorMessage && <div className="text-red-500 text-xs mt-1">{errorMessage}</div>}
            <h3 className="font-title leading-5 mb-2 mt-6 text-gray-200">나무를 선택해 주세요.</h3>
            <div className="relative">
                <div
                    id="tab"
                    className={tw(
                        "py-3 px-4 bg-gray-600",
                        `${isDropdownOpen ? "" : "hover:bg-gray-400 cursor-pointer"}`,
                        "fill-white flex items-center justify-between select-none"
                    )}
                    onClick={toggleDropdown}
                >
                    {selectedTree ? selectedTree.tree_name : "나무를 선택해 주세요."}
                    <IconSelectArrow
                        className={`w-4 transition-transform duration-300 ${isDropdownOpen ? "transform rotate-180" : ""}`}
                    />
                </div>
                {isDropdownOpen && (
                    <ul className="absolute left-0 top-full right-0 z-10 cursor-pointer bg-gray-800">
                        {treeList.map((item) => (
                            <ModalListItem
                                key={item.tree_uuid}
                                item={item}
                                onClick={() => handleItemClick(item)}
                            />
                        ))}
                    </ul>
                )}
            </div>

            <div className="text-right mt-4">
                <ButtonDefault className="ml-1" onClick={createChatHandler}>
                    생성하기
                </ButtonDefault>
            </div>
            <button
                type="button"
                className="text-zero w-5 h-5 absolute right-5 top-5 fill-gray-600 hover:fill-white transition"
                onClick={onClose}
            >
                <IconClose />
                닫기
            </button>
        </div>
    );
};

export default ModalCreateChat;
