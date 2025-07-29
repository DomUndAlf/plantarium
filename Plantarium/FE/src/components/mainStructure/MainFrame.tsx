import Header from "./Header";
import Footer from "./Footer";
import MainLayer from "../gardenItself/MainLayer";
import { createContext, useEffect, useState } from "react";
import { IGarden } from "../../interfaces/interfaces";
import CreateGarden from "../CreateGarden";

export const UserContext = createContext<IGarden | null>(null);

function MainFrame() {
    const [user, setUser] = useState<IGarden | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeDialog, setActiveDialog] = useState<null | "garden" | "structure" | "beds" | "plants">(null);
//HIER MORGEN WEITER MACHEN


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:3001/users/me", {
                    credentials: "include",
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.data); // oder setUser(data), je nach API
                } else {
                    console.warn("User nicht eingeloggt");
                    setUser(null);
                }
                } catch (err) {
                    console.error("Fehler beim Laden des Users", err);
                    setUser(null);
                } finally {
                    setLoading(false);
                }
            };

            fetchUser();
        }, []);

        if (loading) return <p className="text-white p-4">Lade...</p>;
        if (!user) return <CreateGarden />;

    return (
        <UserContext.Provider value={user}>
            <div className="flex flex-col min-h-screen">
                <Header />
                <MainLayer />
                <Footer />
            </div>
        </UserContext.Provider>
    )
}

export default MainFrame;