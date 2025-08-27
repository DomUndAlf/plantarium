import { useContext } from "react";
import { IBed } from "../../interfaces/interfaces";
import { BedsContext } from "../../contexts";
import { Button } from "@headlessui/react";
import { DialogContext } from "../dialogues/Dialogcontext";

function BedDetails() {
    const dialog = useContext(DialogContext);
    const { beds } = useContext(BedsContext) as { beds: IBed[]; setBeds: (updater: IBed[] | ((prev: IBed[]) => IBed[])) => void; };

    if (!beds || beds.length === 0) {
        { console.log("nix anzuzeigen"); }
        return null;
    }

    return (

        <>
        <h2 className="pl-8" > beds</h2>
            {beds.map((bed) => (
                <div key={bed.id} className="flex flex-col pl-2 rounded-xl  bg-white/80">
                    <h2 className="font-semibold text-black pl-5 pt-5"> bed {bed.id}</h2>
                    <div className="w-90 p-5 pb-1 text-black">
                        <p className="font-normal">height:  {bed.height / 100}m </p>
                        <p className="font-normal">width:  {bed.width / 100}m</p>
                        <p className="font-normal">position:  {bed.x_position / 100}m, {bed.y_position / 100}</p>
                        <p className="font-normal">plant: {bed.bed_plants[0] ? bed.bed_plants[0].plants?.name : "empty"} </p>
                        <p className="font-normal">bed ID:  {bed.id} </p>
                    </div>
                    <div className="flex items-center justify-center w-full p-4">
                    <Button onClick={() => dialog.setActiveDialog("bed")} className="p-2 m-2 pl-3 w-35 rounded-xl bg-mint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
                        delete bed </Button>
                    <Button onClick={() => dialog.setActiveDialog("bed")} className="m-2 p-2 pl-3 w-35 rounded-xl bg-mint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
                        delete plants </Button>
                        </div>
                </div>
            ))}
        </>
    )
}



export default BedDetails;