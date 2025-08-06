import { Button, Dialog, DialogPanel, DialogTitle, Field, Label, Select } from "@headlessui/react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import BedDialogue from "./BedDialogue";
import PathTeraceHut from "./PathTeraceHut";

export type Props = {
    isOpen: boolean;
    onClose: () => void;
};

function StructureDialogue({ isOpen, onClose }: Props) {
    const [selectedType, setSelectedType] = useState("path");

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <div className="fixed inset-0 bg-black/50 z-40" />

            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <DialogPanel className="bg-white p-6 rounded-xl shadow-xl w-110">
                    <DialogTitle className="text-xl font-bold text-darkMint mb-5">Add a new Surface</DialogTitle>

                    <Field>
                        <Label className="font-semibold text-black">Surface type</Label>
                        <div className="relative">
                            <Select className='mt-2 mb-4 block w-full appearance-none  border-1 rounded-xl border-darkMint/20 p-2 text-md/8 text-black'
                                value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                                <option value="path">Path</option>
                                <option value="terrace">Terrace</option>
                                <option value="building">Building</option>
                                <option value="bed">Bed</option>
                            </Select>
                            <ExpandMore className=" absolute top-2.5 right-2.5 size-4 fill-white/60" aria-hidden="true" />
                        </div>
                    </Field>

                    {selectedType=="bed" &&  <BedDialogue />}
                    {selectedType=="path" && <PathTeraceHut />}
                    {selectedType=="terrace" && <PathTeraceHut />}
                    {selectedType=="building" && <PathTeraceHut />}

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
    );
}

export default StructureDialogue;
