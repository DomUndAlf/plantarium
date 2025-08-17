import { useContext } from "react";
import { IBed } from "../../interfaces/interfaces";
import { BedsContext } from "../mainStructure/MainFrame";
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
            {beds.map((bed) => (
                <div key={bed.id} className="flex items-center flex-col rounded-xl  bg-white/80">
                    <div className="w-90 p-5 pb-1 text-black">
                        <p className="font-semibold">Höhe: <span className="font-light"> {bed.height / 100}m </span> </p>
                        <p className="font-semibold">Breite: <span className="font-light"> {bed.width / 100}m </span></p>
                        <p className="font-semibold">Position: <span className="font-light"> {bed.x_position / 100}m, {bed.y_position / 100}m</span></p>
                    </div>
                    <Button onClick={() => dialog.setActiveDialog("bed")} className="m-4 p-2 pl-3 pr-3 w-30 rounded-xl bg-darkMint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
                        delete </Button>
                </div>
            ))}
        </>
    )
}



export default BedDetails;