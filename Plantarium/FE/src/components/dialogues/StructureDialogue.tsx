import { Button, Dialog, DialogPanel, DialogTitle, Field, Label, Select } from "@headlessui/react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import BedDialogue from "./BedDialogue";
import PathTeraceHut from "./PathTeraceHut";
import { IStructureManualInput } from "../../interfaces/interfaces";

export type Props = {
    isOpen: boolean;
    onClose: () => void;
    setPendingStruct: (s: IStructureManualInput) => void;
    setIsPlacing: (v: boolean) => void;
};


function StructureDialogue({ isOpen, onClose, setPendingStruct, setIsPlacing }: Props) {
    const [selectedType, setSelectedType] = useState("path");
    const [struct, setStruct] = useState<IStructureManualInput>({
        width: 0,
        height: 0,
        type: selectedType,
        x_position: 0,
        y_position: 0
    });

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  onClose();

  setTimeout(() => {
    setPendingStruct({
        width: Number(struct.width),
        height: Number(struct.height),
        type: selectedType,
        x_position: 0,
        y_position: 0
    });
    setIsPlacing(true);
  }, 100);
};



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

                    {selectedType === "bed" && <BedDialogue struct={struct} setStruct={setStruct} type="bed" />}
                    {selectedType === "path" && <PathTeraceHut struct={struct} setStruct={setStruct} type="path" />}
                    {selectedType === "terrace" && <PathTeraceHut struct={struct} setStruct={setStruct} type="terrace" />}
                    {selectedType === "building" && <PathTeraceHut struct={struct} setStruct={setStruct} type="building" />}

                    <div className="flex justify-center gap-2 mt-2">
                        <Button onClick={handleSubmit} className="text-lg m-1 mb-1 mt-4 p-2 px-3 bg-darkMint/80 text-white rounded-xl hover:bg-darkMint/60">
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
