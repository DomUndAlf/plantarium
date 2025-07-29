import { useContext } from "react";
import { UserContext } from "../mainStructure/MainFrame";
import { Button } from "@headlessui/react";

type Props = {
    detailName: string;
}

function Details({ detailName }: Props) {
    const user = useContext(UserContext);
    switch (detailName) {
        case "garden":
            return (
                <div className="flex items-center flex-col">
            <div className="w-90 p-5 bg-white/80 text-black rounded-xl mb-3">
                <p className="font-semibold">Ort:</p> <p className="font-light">{user?.location}</p>
                <p className="font-semibold">Höhe:</p> <p className="font-light">{user?.height} m</p>
                <p className="font-semibold">Breite:</p> <p className="font-light">{user?.width} m </p>
            </div>
            <Button className="m-3 p-2 pl-8 pr-8 rounded-xl bg-darkMint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
                        Edit </Button>
            </div>);
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