import { useState, useEffect } from "react";
import YardIcon from '@mui/icons-material/Yard';
import Sidebar from "../Sidebar/Sidebar";

type Props = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (v: boolean) => void;
};

function Header({ isSidebarOpen, setIsSidebarOpen }: Props) {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(`${import.meta.env.VITE_AUTH_URL}/users/me`, {
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.data.name);
            }
        };
        fetchUser();
    }, []);


    return (
        <header className="fixed top-0 left-0 p-3 w-full bg-mint text-white shadow-md z-50">
            <div className="flex justify-between items-center w-full">
                <YardIcon onClick={() => setIsSidebarOpen(true)} /> 
                <p className="absolute left-1/2 transform -translate-x-1/2" >Hallo {user}!</p>
            </div>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </header>
    );
}

export default Header;