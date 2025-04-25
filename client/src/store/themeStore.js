// themeStore.js
import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: "light",
    setTheme: (theme) => {
        set({ theme });
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    },
    toggleTheme: () =>
        set((state) => {
            const newTheme = state.theme === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            document.documentElement.setAttribute("data-theme", newTheme);
            return { theme: newTheme };
        }),
}));
