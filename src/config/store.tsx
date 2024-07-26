import { create } from "zustand";
import {
    UserAccount,
    UserLevel,
    UserTree,
    UserTreeDetail,
    UserTreeEmotionDetail,
    //TreeItem,
    //ChatRoom,
} from "./types";

interface ModalStore {
    modal: boolean;
    setModal: (bool: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    modal: false,
    setModal: (bool: boolean) => set({ modal: bool }),
}));

interface UserData {
    user: UserAccount;
    level: UserLevel;
    tree: UserTree;
    treeDetail: UserTreeDetail[];
    treeEmotion: UserTreeEmotionDetail | object;
    treeUuid: string;
}

interface UserStore {
    userData: UserData;
    setUserData: (data: UserAccount) => void;
    setLevelData: (data: UserLevel) => void;
    setTreeData: (data: UserTree) => void;
    setTreeDetailData: (data: UserTreeDetail[]) => void;
    setTreeDetailEmotionData: (data: UserTreeEmotionDetail) => void;
    setTreeUuid: (uuid: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    userData: {
        user: {
            id: "",
            username: "...",
            imgUrl: "/img/profile-placeholder.png",
            email: "...",
            created_at: "...",
        },
        level: {
            userLevel: 0,
            userExperience: 0,
            forestUUID: "0",
        },
        tree: {
            treeMax: 0,
            treeCurrent: 0,
            gridSize: 0,
            accessibleIndices: [6, 7, 11, 12],
            originIndices: [],
        },
        treeDetail: [],
        treeEmotion: {},
        treeUuid: "",
    },
    setUserData: (data: UserAccount) =>
        set((state) => ({
            userData: { ...state.userData, user: data },
        })),
    setLevelData: (data: UserLevel) =>
        set((state) => ({
            userData: { ...state.userData, level: data },
        })),
    setTreeData: (data: UserTree) =>
        set((state) => ({
            userData: { ...state.userData, tree: data },
        })),
    setTreeDetailData: (data: UserTreeDetail[]) =>
        set((state) => ({
            userData: { ...state.userData, treeDetail: data },
        })),
    setTreeDetailEmotionData: (data: UserTreeEmotionDetail) =>
        set((state) => ({
            userData: { ...state.userData, treeEmotion: data },
        })),
    setTreeUuid: (uuid: string) =>
        set((state) => ({
            userData: { ...state.userData, treeUuid: uuid },
        })),
}));

export interface TreeItem {
    tree_uuid: string;
    tree_name: string;
    group_name: string;
    tree_level: number;
    location: number;
    created_at: string;
}

export interface ChatRoom {
    chat_room_uuid: string;
    chat_room_name: string;
    tree_uuid: string;
    created_at: string;
    tree_name: string;
}

interface ChatStore {
    chatList: ChatRoom[];
    treeList: TreeItem[];
    addChatRoom: (chatRoom: ChatRoom) => void;
    setChatList: (chatList: ChatRoom[]) => void;
    setTreeList: (treeList: TreeItem[]) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
    chatList: [],
    treeList: [],
    addChatRoom: (chatRoom: ChatRoom) =>
        set((state) => ({
            chatList: [chatRoom, ...state.chatList],
        })),
    setChatList: (chatList: ChatRoom[]) =>
        set(() => ({
            chatList: chatList,
        })),
    setTreeList: (treeList: TreeItem[]) =>
        set(() => ({
            treeList,
        })),
}));
