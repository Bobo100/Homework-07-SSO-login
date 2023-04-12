import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../lib/init-firebase";

interface AppContextValue {
    user: User | null;
}

export const AppContext = createContext<AppContextValue>({
    user: null,
});

export const useAppContext = (): AppContextValue => useContext(AppContext);

interface AppProviderProps {
    children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return unsubscribe;
    }, []);

    const value: AppContextValue = {
        user,
    };

    console.log(user)

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
