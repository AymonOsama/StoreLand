import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("rememberedUser"));
    const sessionUser = JSON.parse(sessionStorage.getItem("sessionUser"));

    if (localUser) {
        setUser(localUser);
    } else if (sessionUser) {
        setUser(sessionUser);
    }
}, []);


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
