import { create } from 'zustand';

export interface WindowState {
  id: string;
  app: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export type ThemeType = 'classic' | 'dark' | 'glass';

interface WindowStore {
  windows: WindowState[];
  highestZIndex: number;
  activeAppId: string | null;
  previousAppId: string | null;
  theme: ThemeType;
  openWindow: (app: string, title: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
  setActiveApp: (appId: string | null) => void;
  goBack: () => void;
  toggleTheme: () => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
  windows: [],
  highestZIndex: 1,
  activeAppId: null,
  previousAppId: null,
  theme: 'classic',

  openWindow: (app, title) =>
    set((state) => {
      const existing = state.windows.find((w) => w.app === app);
      if (existing) {
        return {
          windows: state.windows.map((w) =>
            w.app === app
              ? { ...w, isOpen: true, isMinimized: false, zIndex: state.highestZIndex + 1 }
              : w
          ),
          highestZIndex: state.highestZIndex + 1,
        };
      }
      
      const newWindow: WindowState = {
        id: `${app}-${Date.now()}`,
        app,
        title,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: state.highestZIndex + 1,
        position: { x: 100 + state.windows.length * 30, y: 80 + state.windows.length * 30 },
        size: { width: 900, height: 600 },
      };
      
      return {
        windows: [...state.windows, newWindow],
        highestZIndex: state.highestZIndex + 1,
      };
    }),

  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      ),
    })),

  maximizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    })),

  focusWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: state.highestZIndex + 1, isMinimized: false } : w
      ),
      highestZIndex: state.highestZIndex + 1,
    })),

  updatePosition: (id, position) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    })),

  updateSize: (id, size) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, size } : w
      ),
    })),

  setActiveApp: (appId) =>
    set((state) => ({
      previousAppId: state.activeAppId,
      activeAppId: appId,
    })),

  goBack: () =>
    set((state) => ({
      activeAppId: state.previousAppId,
      previousAppId: null,
    })),

  toggleTheme: () =>
    set((state) => {
      const themes: ThemeType[] = ['classic', 'dark', 'glass'];
      const currentIndex = themes.indexOf(state.theme);
      const nextIndex = (currentIndex + 1) % themes.length;
      return { theme: themes[nextIndex] };
    }),
}));
