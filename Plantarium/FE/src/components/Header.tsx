import { useState, useEffect } from "react";
import YardIcon from '@mui/icons-material/Yard';

function Header() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch("http://localhost:3001/users/me", {
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
                <YardIcon />
                <p className="absolute left-1/2 transform -translate-x-1/2" >Hallo {user}!</p>
            </div>
        </header>
    );
}

export default Header;