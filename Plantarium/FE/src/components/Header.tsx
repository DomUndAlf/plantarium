import { useState, useEffect } from "react";

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
    <header className="fixed top-0 left-0 p-3 w-full bg-mint text-white shadow-md z-50 text-center ">
        <p className="">Hallo {user}!</p>
    </header>
);
}

export default Header;