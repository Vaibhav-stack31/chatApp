import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "https://chatapp-backend-61nl.onrender.com";
export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            console.error(`Error in checkAuth: ${error}`);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true })
        try {
            const response = await axiosInstance.post("/auth/signup", data);
            set({ authUser: data });
            toast.success("Account created successfully!!!");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false })
        }
    },
    
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({authUser: res.data});
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isUpdatingProfile: false});
        }
    },
    // useAuthStore.js
    connectSocket: () => {
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: { userId: authUser._id }
        });

        socket.on("connect", () => {
            console.log("Socket connected");
        });

        socket.on("allUsers", async(users) => {
            await set({onlineUsers: users});
        });


        socket.on("userOnline", (userId) => {
            set((state) => {
                if (!state.onlineUsers.includes(userId)) {
                    return { onlineUsers: [...state.onlineUsers, userId] };
                }
                return state;
            });
        });

        socket.on("userOffline", (userId) => {
            set((state) => ({
                onlineUsers: state.onlineUsers.filter((id) => id !== userId)
            }));
        });     

        socket.on("connect_error", (err) => {
            console.log("Connection error:", err);
        });

        set({socket});
        socket.connect();
    },
    disconnectSocket: () => {
        const socket = get().socket;
        if (socket?.connected) {
            socket.off("allUsers");
            socket.off("userOnline");
            socket.off("userOffline");
            socket.disconnect();
        }
    },
}))
