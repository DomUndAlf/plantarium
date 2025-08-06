import { Dialog, DialogPanel, DialogTitle, Input, Button } from "@headlessui/react";
import { Props } from "./StructureDialogue";

function BedplantDialogue() {
    return (
        <>
            
            <p className="text-xl font-bold text-darkMint mb-3 mt-6">Add a new bed plant</p>
            <div>
                <p className="mt-2 text-sm text-darkMint font-medium">
                    Please create a separate bed for every type of plant you would like to plant there.
                </p>
                <p className="mt-3 font-semibold "> Name: </p>
                    <Input className="mt-2 w-full font-light p-2 border-1 rounded-xl border-darkMint/20" value="plant name"></Input>
                <p className="mt-3 font-semibold"> Date of planting: </p>
                    <Input className="mt-2 w-full font-light p-2 border-1 rounded-xl border-darkMint/20" type="date" value="0"></Input>
                <p className="mt-3 font-semibold"> Quantity: </p>
                    <Input className="mt-2 w-full font-light p-2 border-1 rounded-xl border-darkMint/20" value="~"></Input>
            </div>
        </>
    )
}

export default BedplantDialogue;