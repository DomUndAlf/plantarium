import Header from "./Header";
import Footer from "./Footer";
import MainLayer from "../gardenItself/MainLayer";
import { createContext, useEffect, useState } from "react";
import { IGarden, IStructureManualInput } from "../../interfaces/interfaces";
import CreateGarden from "../CreateGarden";
import Dialoge from "../dialogues/Dialoge";
import { DialogContext } from "../dialogues/Dialogcontext";

export const UserContext = createContext<IGarden | null>(null);
export const StructContext = createContext<IStructureManualInput | null>(null);

function MainFrame() {
    const [user, setUser] = useState<IGarden | null>(null);
    const [struct, setStruct] =useState<IStructureManualInput | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeDialog, setActiveDialog] = useState<null | "garden" | "structure" | "bed" | "plant" | "bedplant">(null);

//mehr use effect und mehr context provider für structures, single plants und bedplants

    useEffect(() => {
        const fetchStruct = async () => {
            try {
                const res = await fetch("http://localhost:3001/me/garden/surfaces", {
                    credentials: "include",
                });

                if (res.ok) {
                    const data = await res.json();
                    setStruct(data.data);
                } else {
                    console.warn("User nicht eingeloggt");
                    setStruct(null);
                }
            } catch (err) {
                console.error("Fehler beim Laden der Struktur", err);
                setStruct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchStruct();
    }, []);



    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:3001/users/me", {
                    credentials: "include",
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.data);
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
        <StructContext.Provider value ={struct}>
            <DialogContext.Provider value={{ setActiveDialog, activeDialog }}>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <MainLayer />
                    <Footer />
                    {activeDialog && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <Dialoge activeDialog={activeDialog} onClose={() => setActiveDialog(null)}/> 
                        </div>
                    )}
                </div>
            </DialogContext.Provider>
        </StructContext.Provider>
        </UserContext.Provider>
    )
}

export default MainFrame;