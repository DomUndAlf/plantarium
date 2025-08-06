import { Dialog, DialogPanel, DialogTitle, Input, Button } from "@headlessui/react";
import { Props } from "./StructureDialogue";


function PlantDialogue({ isOpen, onClose }: Props) {
    return(
        <Dialog open={isOpen} onClose={onClose}>
            <div className="fixed inset-0 bg-black/50 z-40"/>

            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <DialogPanel className="bg-white/80 p-6 rounded-xl shadow-xl w-110">
                    <DialogTitle className="text-xl font-bold text-darkMint mb-5">Add a new singluar plant</DialogTitle>
                <div>
                    <p className="mt-3 font-semibold "> Height: </p>
                    <Input className="mt-2 w-full font-light p-2 border-1 rounded-xl border-darkMint/20" value="0"></Input>
                    <p className="mt-3 font-semibold"> Width: </p>
                    <Input className="mt-2 w-full font-light p-2 border-1 rounded-xl border-darkMint/20" value="0"></Input>
                </div>
                <div className="flex justify-center gap-2 mt-2">
                    <Button onClick={onClose} className="text-lg m-1 mb-1 mt-4 p-2 px-3 bg-darkMint/80 text-white rounded-xl hover:bg-darkMint/60">
                        Save & Place
                    </Button>
                    <Button onClick={onClose} className="text-lg m-1  mb-1 mt-4 px-3 p-2 bg-darkMint/80 text-white rounded-xl hover:bg-darkMint/60">
                        Close
                    </Button>
                </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default PlantDialogue;