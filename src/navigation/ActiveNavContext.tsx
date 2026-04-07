import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_PRIMARY_NAV_ID,
  PRIMARY_NAV,
  type PrimaryNavId,
  type PrimaryNavItemConfig,
} from "./primaryNavConfig";

export type ActiveNavContextValue = {
  activeId: PrimaryNavId;
  setActiveId: (id: PrimaryNavId) => void;
  activeNavItem: PrimaryNavItemConfig;
};

const ActiveNavContext = createContext<ActiveNavContextValue | null>(null);

function navItemById(id: PrimaryNavId): PrimaryNavItemConfig {
  const item = PRIMARY_NAV.find((n) => n.id === id);
  if (!item) return PRIMARY_NAV[0];
  return item;
}

type ActiveNavProviderProps = {
  children: ReactNode;
};

export function ActiveNavProvider({ children }: ActiveNavProviderProps) {
  const [activeId, setActiveIdState] = useState<PrimaryNavId>(
    DEFAULT_PRIMARY_NAV_ID
  );

  const setActiveId = useCallback((id: PrimaryNavId) => {
    setActiveIdState(id);
  }, []);

  const value = useMemo<ActiveNavContextValue>(
    () => ({
      activeId,
      setActiveId,
      activeNavItem: navItemById(activeId),
    }),
    [activeId, setActiveId]
  );

  return (
    <ActiveNavContext.Provider value={value}>
      {children}
    </ActiveNavContext.Provider>
  );
}

export function useActiveNav(): ActiveNavContextValue {
  const ctx = useContext(ActiveNavContext);
  if (ctx == null) {
    throw new Error("useActiveNav must be used within ActiveNavProvider");
  }
  return ctx;
}
