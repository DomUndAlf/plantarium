import { useContext } from "react";
import { IBed } from "../../interfaces/interfaces";
import { BedsContext } from "../../contexts";
import { Button } from "@headlessui/react";

function BedDetails() {
    const { beds, setBeds } = useContext(BedsContext) as { beds: IBed[]; setBeds: (updater: IBed[] | ((prev: IBed[]) => IBed[])) => void; };

    if (!beds || beds.length === 0) {
        { console.log("nix anzuzeigen"); }
        return null;
    }

    async function deleteBed(bedId: number) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/me/garden/beds/${bedId}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            method: "DELETE",
        });

        const confirmed = confirm("Are you sure you want to delete this bed?");
        if (!confirmed) return;

        setBeds((prevBeds) => prevBeds.filter((bed) => bed.id !== bedId));
        if (!res.ok) throw new Error("Error deleting bed");
        return res.json();
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
                        <Button onClick={() => deleteBed(bed.id)} className="p-2 m-2 pl-3 w-35 rounded-xl bg-mint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
                            delete bed </Button>
                    </div>
                </div>
            ))}
        </>
    )
}



export default BedDetails;