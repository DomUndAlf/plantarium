import { useContext, useEffect, useState } from "react";
import { UserContext } from "../mainStructure/MainFrame";
import { Button, Input } from "@headlessui/react";
import { IGarden } from "../../interfaces/interfaces";


function GardenDetails() {
    const user = useContext(UserContext);

    const [garden, setGarden] = useState<IGarden>({
        name: "",
        location: "",
        height: "",
        width: "",
    });

    useEffect(() => {
        if (user) {
            setGarden({
                name: user.name || "",
                location: user.location || "",
                height: user.height || "",
                width: user.width || "",
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGarden({
            ...garden,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3001/users/me/garden", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                name: garden.name,
                location: garden.location,
                height: Number(garden.height),
                width: Number(garden.width),
            }),
        });

        if (res.ok) {
            const data = await res.json();
            console.log("Update erfolgreich:", data);
            window.location.reload();
        } else {
            console.error("Fehler beim Update");
        }
    };

            return (
                <form onSubmit={handleSubmit} className="flex items-center flex-col">
                    <div className="w-90 p-5 bg-white/80 text-black rounded-xl mb-3">
                        <p className="font-semibold">Ort:</p>
                        <Input
                            className="font-light w-80 p-2 border-1 rounded-xl border-darkMint/20"
                            name="location"
                            value={garden.location}
                            onChange={handleChange}
                        />
                        <p className="font-semibold">Höhe:</p>
                        <Input
                            className="font-light p-2 border-1 rounded-xl border-darkMint/20"
                            name="height"
                            value={garden.height}
                            onChange={handleChange}
                        />
                        <p className="font-semibold">Breite:</p>
                        <Input
                            className="font-light p-2 border-1 rounded-xl border-darkMint/20"
                            name="width"
                            value={garden.width}
                            onChange={handleChange}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="m-3 p-2 pl-8 pr-8 rounded-xl bg-darkMint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150"
                    >
                        Update
                    </Button>
                </form>
            );

}

export default GardenDetails;