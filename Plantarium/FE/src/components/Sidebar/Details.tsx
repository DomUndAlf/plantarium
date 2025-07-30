import { useContext, useEffect, useState } from "react";
import { UserContext } from "../mainStructure/MainFrame";
import { Button, Input } from "@headlessui/react";
import { IGarden } from "../../interfaces/interfaces";

type Props = {
    detailName: string;
}

function Details({ detailName }: Props) {
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

    switch (detailName) {
        case "garden":
            return (
                <form onSubmit={handleSubmit} className="flex items-center flex-col">
                    <div className="w-90 p-5 bg-white/80 text-black rounded-xl mb-3">
                        <p className="font-semibold">Ort:</p>
                        <Input
                            className="font-light w-80"
                            name="location"
                            value={garden.location}
                            onChange={handleChange}
                        />
                        <p className="font-semibold">Höhe:</p>
                        <Input
                            className="font-light"
                            name="height"
                            value={garden.height}
                            onChange={handleChange}
                        />
                        <p className="font-semibold">Breite:</p>
                        <Input
                            className="font-light"
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


        case "structure":
            // hier gehört noch mapping hin
            return (
                <div className="flex items-center flex-col">
                    <div className="w-90 p-5 bg-white/80 text-black rounded-xl mb-3">
                        <p className="font-semibold">Art:</p>
                        <p className="font-semibold">Höhe:</p>
                        <p className="font-semibold">Breite:</p>
                        {/* soll man hier noch location im garten anzeigen? */}
                    </div>
                    <Button className="m-3 p-2 pl-3 pr-3 rounded-xl bg-darkMint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
                        add new structure </Button>
                </div>

            );
        case "beds":
            // hier gehört noch mapping hin
            return (
                <div className="flex items-center flex-col">
                    <div className="w-90 p-5 bg-white/80 text-black rounded-xl mb-3">
                        <p className="font-semibold">Höhe:</p>
                        <p className="font-semibold">Breite:</p>
                        {/* soll man hier noch location im garten anzeigen? */}
                    </div>
                    <Button className="m-3 p-2 pl-3 pr-3 rounded-xl bg-darkMint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
                        add new bed </Button>
                </div>);

        case "bedplants":
            // hier gehört noch mapping hin, details aus den Pflanzenentity
            return (
                <div className="flex items-center flex-col">
                    <div className="w-90 p-5 bg-white/80 text-black rounded-xl mb-3">
                        <p className="font-semibold">Art:</p>
                        <p className="font-semibold">Höhe:</p>
                        <p className="font-semibold">Breite:</p>
                        <p className="font-semibold">Gepflanzt am:</p>
                        {/* soll man hier noch location im garten anzeigen? */}
                    </div>
                    <Button className="m-3 p-2 pl-3 pr-3 rounded-xl bg-darkMint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
                        add new bedplant </Button>
                </div>
            );
        case "plants":
            // hier gehört noch mapping hin, details aus den Pflanzenentity
            return (
                <div className="flex items-center flex-col">
                    <div className="w-90 p-5 bg-white/80 text-black rounded-xl mb-3">
                        <p className="font-semibold">Name:</p>
                        <p className="font-semibold">Höhe:</p>
                        <p className="font-semibold">Breite:</p>
                        <p className="font-semibold">Gepflanzt am:</p>
                        {/* soll man hier noch location im garten anzeigen? */}
                    </div>
                    <Button className="m-3 p-2 pl-3 pr-3 rounded-xl bg-darkMint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
                        add new singular plant </Button>
                </div>
            );
    }
}

export default Details;