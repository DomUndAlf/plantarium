import { Button } from "@headlessui/react";
import { useContext } from "react";
import { DialogContext } from "../dialogues/Dialogcontext";
import { StructContext } from "../../contexts";
import type { IStructure } from "../../interfaces/interfaces";

import CabinIcon from '@mui/icons-material/Cabin';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DeckIcon from '@mui/icons-material/Deck';

function getIcon(type: string) {
    switch (type) {
        case "terrace":
            return <DeckIcon className="text-mint absolute right-4" />;
        case "building":
            return <CabinIcon className="text-mint absolute right-4" />;
        case "path":
            return <DirectionsWalkIcon className="text-mint absolute right-4" />;
        default:
            return <span></span>;
    }
}

function StructureDetails() {
    const dialog = useContext(DialogContext);
    const { structures, setStructures } = useContext(StructContext) as {
        structures: IStructure[];
        setStructures: (updater: IStructure[] | ((prev: IStructure[]) => IStructure[])) => void;
    };

    if (!structures || structures.length === 0) {
        { console.log("nix anzuzeigen"); }
        return (
            <div className="flex items-center flex-col">
                <Button onClick={() => dialog.setActiveDialog("structure")} className="m-3 p-2 pl-3 pr-3 rounded-xl bg-darkMint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
                    add new structure </Button>
            </div>
        )
    }

    async function deleteStructure(surfaceId: number) {
        const confirmed = confirm("Are you sure you want to delete this structure?");
        if (!confirmed) return;

        const res = await fetch(`${import.meta.env.VITE_STRUCT_URL}/me/garden/surfaces/${surfaceId}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            method: "DELETE",
        });

        setStructures((prev) => prev.filter((s) => s.id !== surfaceId));

        if (!res.ok) throw new Error("Fehler beim Löschen des Beets");
        return res.json();
    }


    return (
        <>
            <h2 className="pl-8">surfaces</h2>
            {structures.map((i) => (
                <div className="flex items-center flex-col  rounded-xl  bg-white/80 ">
                    <div className="w-90 p-5 pb-1 text-black">
                        <p className="font-semibold mb-3"> {i.type} {getIcon(i.type)}</p>
                        <p className="font-normal">height: <span className="font-light"> {i.height / 100}m </span></p>
                        <p className="font-normal">width: <span className="font-light"> {i.width / 100}m </span> </p>
                        <p className="font-normal">positioned at: <span className="font-light">width {i.x_position / 100}m, height {i.y_position / 100}m</span></p>
                    </div>
                    <Button onClick={() => deleteStructure(i.id)} className="m-4 p-2 pl-3 pr-3 w-30 rounded-xl bg-mint/90 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
                        delete </Button>
                </div>
            ))}
            <div className="flex items-center flex-col">
                <Button onClick={() => dialog.setActiveDialog("structure")} className="m-3 mt-2 p-2 pl-3 pr-3 rounded-xl bg-darkMint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
                    add new structure or bed </Button>
            </div>
        </>
    );
};

export default StructureDetails;