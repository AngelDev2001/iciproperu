import {createContext, type ReactElement, type ReactNode} from "react";
import {version} from "vite";

const VersionContext = createContext<{ version: string }>({version: ""});

interface VersionProviderProps {
    children: ReactNode;
}

export function VersionProvider({ children }: VersionProviderProps): ReactElement {
    return (
        <VersionContext.Provider value={{ version }}>
            {children}
        </VersionContext.Provider>
    );
}
