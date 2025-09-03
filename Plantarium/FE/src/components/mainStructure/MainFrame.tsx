import Header from "./Header";
import Footer from "./Footer";
import MainLayer from "../gardenItself/MainLayer";
import { useEffect, useState } from "react";
import { IBed, IGarden, IStructure } from "../../interfaces/interfaces";
import CreateGarden from "../CreateGarden";
import Dialoge from "../dialogues/Dialoge";
import { DialogContext, DialogType } from "../dialogues/Dialogcontext";
import { BedsContext, SinglePlantContext, StructContext, UserContext } from "../../contexts";
function MainFrame() {
    
    const [user, setUser] = useState<IGarden | null>(null);
    const [structures, setStructures] = useState<IStructure[]>([]);
    const [beds, setBeds] = useState<IBed[]>([]);
    const [, setBedPlants] = useState<any[]>([]);
    const [singularPlants, setSingularPlants] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);
    const [activeDialog, setActiveDialog] = useState<DialogType | null>(null);
    const [pendingStructure, setPendingStructure] = useState<IStructure | null>(null);
    const [pendingPlant, setPendingPlant] = useState<any | null>(null);
    const [isPlacing, setIsPlacing] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeBedId, setActiveBedId] = useState<number | null>(null);
    const [weather, setWeather] = useState<any | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            console.log("Token aus URL gefunden:", token);
            localStorage.setItem("token", token);
            console.log("Token jetzt im localStorage:", localStorage.getItem("token"));
            window.history.replaceState({}, document.title, "/dashboard");
        }
    }, []);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.warn("Kein Token gefunden → nicht eingeloggt");
                    return;
                }

                const res = await fetch(`${import.meta.env.VITE_WEATHER_URL}/me/garden/weather`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log("Wetterdaten:", data);
                    setWeather(data);
                    console.log("Wetter im State gesetzt:", data);
                } else {
                    console.warn("Wetter konnte nicht geladen werden", await res.json());
                }
            } catch (err) {
                console.error("Fehler beim Laden des Wetters", err);
            }
        };

        fetchWeather();
    }, []);


    useEffect(() => {

    }, []);
    useEffect(() => {
        const fetchSinglePlants = async () => {
            const res = await fetch(`${import.meta.env.VITE_PLANTS_URL}/me/garden/individual-plants`, { credentials: "include" });
            if (res.ok) {
                const data = await res.json();
                setSingularPlants(data);
            }
        };
        fetchSinglePlants();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [surfacesRes, bedsRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_STRUCT_URL}/me/garden/surfaces`, { credentials: "include" }),
                    fetch(`${import.meta.env.VITE_BEDS_URL}/me/garden/beds`, { credentials: "include" }),
                ]);

                if (surfacesRes.ok) {
                    const data = await surfacesRes.json();
                    setStructures(data.data);
                }
                if (bedsRes.ok) {
                    const data = await bedsRes.json();
                    setBeds(data.data);
                    setBedPlants(data.data.flatMap((bed: IBed) => bed.plants));
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
                const res = await fetch(`${import.meta.env.VITE_AUTH_URL}/users/me`, {
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

    if (!user?.location) {
        return (
            <CreateGarden
                onGardenCreated={(newGarden: IGarden) => setUser(newGarden)}
            />
        );
    }


    return (
        <UserContext.Provider value={user}>
            <StructContext.Provider value={{ structures, setStructures }}>
                <BedsContext.Provider value={{ beds, setBeds, activeBedId, setActiveBedId }}>
                    <DialogContext.Provider value={{ setActiveDialog, activeDialog }}>
                        <SinglePlantContext.Provider value={{ singularPlants, setSingularPlants }}>
                            <div className="flex flex-col min-h-screen">
                                <Header isSidebarOpen={isSidebarOpen}
                                    setIsSidebarOpen={setIsSidebarOpen} />
                                <MainLayer isPlacing={isPlacing}
                                    pendingStruct={pendingStructure}
                                    setIsPlacing={setIsPlacing} weather={weather}
                                    pendingPlant={pendingPlant} setPendingPlant={function (): void {
                                        throw new Error("Function not implemented.");
                                    }} />
                                <Footer />
                                {activeDialog && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                                        <Dialoge activeDialog={activeDialog} onClose={() => setActiveDialog(null)}
                                            setPendingStruct={setPendingStructure}
                                            setIsPlacing={setIsPlacing}
                                            setPendingPlant={setPendingPlant}
                                        />
                                    </div>
                                )}
                            </div>
                        </SinglePlantContext.Provider>
                    </DialogContext.Provider>
                </BedsContext.Provider>
            </StructContext.Provider>
        </UserContext.Provider>
    )
}


export default MainFrame;
