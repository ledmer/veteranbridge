import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "./useAuthStore";

interface Message {
  id: string;
  sender: string;
  text: string;
  group: string;
  createdAt: string;
}

interface ChatState {
  socket: Socket | null;
  messages: Message[];
  selectedGroup: string | null;
  setSelectedGroup: (group: string) => void;
  sendMessage: (text: string) => void;
  connectSocket: () => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  socket: null,
  messages: [],
  selectedGroup: null,
  setSelectedGroup: (group) => {
    set({ selectedGroup: group });
    get().clearMessages();
    // Optionally: fetch group messages from backend here
  },
  sendMessage: (text) => {
    const { socket, selectedGroup } = get();
    const user = useAuthStore.getState().user;
    if (socket && selectedGroup && user) {
      socket.emit("sendMessage", {
        text,
        group: selectedGroup,
        sender: user.username,
        createdAt: new Date().toISOString(),
      });
    }
  },
  connectSocket: () => {
    const user = useAuthStore.getState().user;
    if (!user || !user.id) return; // Prevent socket connection if user is not loaded
    if (get().socket) return;
    const socket = io("http://localhost:5001", { query: { userId: user.id } });
    socket.on("receiveMessage", (msg: Message) => {
      // Only add messages for the currently selected group
      if (msg.group === get().selectedGroup) {
        set((state) => ({ messages: [...state.messages, msg] }));
      }
    });
    set({ socket });
  },
  clearMessages: () => set({ messages: [] }),
}));
