import { Dialog, DialogPanel, DialogTitle, Button } from "@headlessui/react";
import PlantDialogue from "./Plantdialogue";

type WrapperDialogueProps = {
  isOpen: boolean;
  onClose: () => void;
  plantType: "bed" | "single";
};

function WrapperDialogue({ isOpen, onClose, plantType }: WrapperDialogueProps) {

    return(
        <Dialog open={isOpen} onClose={onClose}>
            <div className="fixed inset-0 bg-black/50 z-40"/>

            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <DialogPanel className="bg-white/95 p-6 rounded-xl shadow-xl w-110">
                    <DialogTitle className="text-xl font-bold text-darkMint mb-5">Add a new plant</DialogTitle>
                    <PlantDialogue plantType={plantType} />
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

export default WrapperDialogue;