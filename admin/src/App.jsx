import { useState, useEffect } from 'preact/hooks';
import { UserContext } from "./context/UserContext";

import Login from './pages/Login/Login.jsx';
import Admin from './pages/Admin/Admin.jsx';

function restoreUser() {
    try { return JSON.parse(localStorage.getItem('user')); } 
    catch { return null; } 
}

export function App() {
    const [currentUser, setCurrentUser] = useState(restoreUser());

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('user', JSON.stringify(currentUser));
        }
        else localStorage.removeItem('user');
    }, [currentUser]);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            { !currentUser ? <Login /> : <Admin /> }
        </UserContext.Provider>
    );
}