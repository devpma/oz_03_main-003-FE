import { axiosInstance } from "./axios";

export const getChatRooms = () => {
    return axiosInstance.get("/chat");
};
export const CreateChatRoom = () => {
    return axiosInstance.post("/chat/new");
};
