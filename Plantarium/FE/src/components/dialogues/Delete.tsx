import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { IBed, IStructure } from "../../interfaces/interfaces";


export type Props = {
    isOpen: boolean;
    onClose: () => void;
    toDelete: IStructure | IBed | null;
};


function Del({ isOpen, onClose, toDelete }: Props) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toDelete) return;

    await fetch(`${import.meta.env.VITE_API_URL}/me/garden/surfaces/${toDelete.id}`, {
      method: "DELETE",
      credentials: "include",
    });

    onClose();
  };


  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/50 z-40" />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <DialogPanel className="bg-white p-6 rounded-xl shadow-xl w-110">
          <DialogTitle className="text-xl font-bold text-darkMint mb-5">Delete?</DialogTitle>
          <p>Are you sure you want to delete <strong>{toDelete?.height ?? "this item"}</strong>?</p>

          <div className="flex justify-center gap-2 mt-2">
            <Button onClick={handleSubmit} className="text-lg m-1 mb-1 mt-4 p-2 px-3 bg-darkMint/80 text-white rounded-xl hover:bg-darkMint/60">
              delete
            </Button>
            <Button onClick={onClose} className="text-lg m-1 mb-1 mt-4 px-3 p-2 bg-darkMint/80 text-white rounded-xl hover:bg-darkMint/60">
              close
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default Del;
