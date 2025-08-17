import Header from "./Header";
import Footer from "./Footer";
import MainLayer from "../gardenItself/MainLayer";
import { createContext, useEffect, useState } from "react";
import { IBed, IGarden, IStructure } from "../../interfaces/interfaces";
import CreateGarden from "../CreateGarden";
import Dialoge from "../dialogues/Dialoge";
import { DialogContext } from "../dialogues/Dialogcontext";

export const UserContext = createContext<IGarden | null>(null);
export const StructContext = createContext<{
  structures: IStructure[];
  setStructures: React.Dispatch<React.SetStateAction<IStructure[]>>;
} | null>(null);
export const BedsContext = createContext<{
  beds: IBed[];
  setBeds: React.Dispatch<React.SetStateAction<IBed[]>>;
} | null>(null);

function MainFrame() {
    const [user, setUser] = useState<IGarden | null>(null);
 const [structures, setStructures] = useState<IStructure[]>([]);
  const [beds, setBeds] = useState<IBed[]>([]);


    const [loading, setLoading] = useState(true);
    const [activeDialog, setActiveDialog] = useState<null | "garden" | "structure" | "bed" | "plant" | "bedplant">(null);
    const [pendingStructure, setPendingStructure] = useState<IStructure | null>(null);
    const [isPlacing, setIsPlacing] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   // const [bedPlants, setBedPlants] = useState([]);


    //mehr use effect und mehr context provider für single plants und bedplants

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [surfacesRes, bedsRes] = await Promise.all([
                    fetch("http://localhost:3001/me/garden/surfaces", { credentials: "include" }),
                    fetch("http://localhost:3001/me/garden/beds", { credentials: "include" }),
                ]);

                if (surfacesRes.ok) {
                    const data = await surfacesRes.json();
                    setStructures(data.data);
                }
                if (bedsRes.ok) {
                    const data = await bedsRes.json();
                    setBeds(data.data);
                }
            } catch (err) {
                console.error("Fehler beim Laden der Garten-Daten", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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

    useEffect(() => {
        if (activeDialog) {
            setIsSidebarOpen(false); // Sidebar automatisch schließen
        }
    }, [activeDialog]);

    if (loading) return <p className="text-white p-4">Lade...</p>;
    if (!user) return <CreateGarden />;


    return (
        <UserContext.Provider value={user}>
            <StructContext.Provider value={{structures, setStructures}}>
                <BedsContext.Provider value={{ beds, setBeds }}>
                    <DialogContext.Provider value={{ setActiveDialog, activeDialog }}>
                        <div className="flex flex-col min-h-screen">
                            <Header isSidebarOpen={isSidebarOpen}
                                setIsSidebarOpen={setIsSidebarOpen} />
                            <MainLayer isPlacing={isPlacing}
                                pendingStruct={pendingStructure}
                                setIsPlacing={setIsPlacing} />
                            <Footer />
                            {activeDialog && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                                    <Dialoge activeDialog={activeDialog} onClose={() => setActiveDialog(null)}
                                        setPendingStruct={setPendingStructure}
                                        setIsPlacing={setIsPlacing}
                                    />
                                </div>
                            )}
                        </div>
                    </DialogContext.Provider>
                </BedsContext.Provider>
            </StructContext.Provider>
        </UserContext.Provider>
    )
}

export default MainFrame;