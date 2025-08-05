import { Button, Description, Dialog, DialogPanel, DialogTitle, Field, Label, Select } from "@headlessui/react";
import ExpandMore from "@mui/icons-material/ExpandMore";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

function StructureDialogue({ isOpen, onClose }: Props) {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <div className="fixed inset-0 bg-black/50 z-40" />

            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <DialogPanel className="bg-white/80 p-6 rounded-xl shadow-xl">
                    <DialogTitle className="text-xl font-bold text-darkMint mb-5">Add a new Surface</DialogTitle>

                    <Field>
                        <Label className="font-bold text-black">Surface type</Label>
                        <div className="relative">
                            <Select className='mt-3 block w-full appearance-none rounded-xl border-none px-3 py-1.5 text-md/8 text-black'>
                                <option value="active">Path</option>
                                <option value="paused">Terrace</option>
                                <option value="delayed">Building</option>
                            </Select>
                            <ExpandMore className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60" aria-hidden="true"/>
                        </div>
                    </Field>

                    <p className="mb-3 mt-3 font-semibold"> Height: </p>
                    <p className="mb-3 mt-3 font-semibold"> Width: </p>

                    <Button onClick={onClose} className="m-1 mb-1 mt-4 p-2 px-3 bg-darkMint/80 text-white rounded-xl hover:bg-darkMint/60">
                        Save & Add more
                    </Button>
                    <Button onClick={onClose} className="m-1  mb-1 mt-4 px-3 p-2 bg-darkMint/80 text-white rounded-xl hover:bg-darkMint/60">
                        Save & Close
                    </Button>
                    <Button onClick={onClose} className="m-1  mb-1 mt-4 px-3 p-2 bg-darkMint/80 text-white rounded-xl hover:bg-darkMint/60">
                        Close
                    </Button>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default StructureDialogue;
