import { axiosInstance } from "./axios";

export const getChatRooms = () => {
    return axiosInstance.post("/chat");
};
export const CreateChatRoom = () => {
    return axiosInstance.post("/chat/new");
};
