import { Dialog, DialogPanel, DialogTitle, Button } from "@headlessui/react";
import PlantDialogue from "./Plantdialogue";
import { useContext, useState } from "react";
import { BedsContext } from "../../../contexts";


type WrapperDialogueProps = {
  isOpen: boolean;
  onClose: () => void;
  plantType: "bed" | "single";
  setPendingPlant: (p: any) => void;
  setIsPlacing: (v: boolean) => void;
};

function WrapperDialogue({
  isOpen,
  onClose,
  plantType,
  setPendingPlant,
  setIsPlacing,
}: WrapperDialogueProps) {
  const [formValues, setFormValues] = useState<any>({});
  const bedsContext = useContext(BedsContext);
  const activeBedId = bedsContext?.activeBedId;

  const handleSubmit = async () => {
    const plantingDate = formValues.planting_date
      ? new Date(formValues.planting_date)
      : new Date();

    if (isNaN(plantingDate.getTime())) {
      console.error("Ungültiges Datum:", formValues.planting_date);
      return;
    }

    if (plantType === "single") {
      setPendingPlant({
        planting_date: plantingDate.toISOString(),
        plantData: {
          name: formValues.name,
          watering_interval: formValues.watering_interval,
          growth_type: "single",
        },
      });
      setIsPlacing(true);
    }

    if (plantType === "bed" && activeBedId !== null) {
      try {
        const res = await fetch(
          `/me/garden/beds/${activeBedId}/plants`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              planting_date: plantingDate.toISOString(),
              plantData: {
                name: formValues.name,
                watering_interval: formValues.watering_interval,
                growth_type: "bed",
              },
            }),
            credentials: "include",
          }
        );

        if (res.ok) {
          window.location.reload();
        }
      } catch (err) {
        console.error("Fehler beim Anlegen der Beetpflanze:", err);
      }
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/50 z-40" />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <DialogPanel className="bg-white/95 p-6 rounded-xl shadow-xl w-110">
          <DialogTitle className="text-xl font-bold text-darkMint mb-5">
            Add a new plant
          </DialogTitle>
          <PlantDialogue plantType={plantType} onChange={setFormValues} />
          <div className="flex justify-center gap-2 mt-2">
            <Button
              onClick={handleSubmit}
              className="text-lg m-1 mb-1 mt-4 p-2 px-3 bg-darkMint/80 text-white rounded-xl hover:bg-darkMint/60"
            >
              Save {plantType === "single" ? "& Place" : ""}
            </Button>
            <Button
              onClick={onClose}
              className="text-lg m-1 mb-1 mt-4 px-3 p-2 bg-darkMint/80 text-white rounded-xl hover:bg-darkMint/60"
            >
              Close
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default WrapperDialogue;
