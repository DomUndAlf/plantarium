import { Dialog, DialogPanel, DialogTitle, Button } from "@headlessui/react";
import PlantDialogue from "./Plantdialogue";
import { useContext, useState } from "react";
import { BedsContext } from "../../mainStructure/MainFrame";

type WrapperDialogueProps = {
  isOpen: boolean;
  onClose: () => void;
  plantType: "bed" | "single";
}; 

function WrapperDialogue({ isOpen, onClose, plantType }: WrapperDialogueProps) {
    const [formValues, setFormValues] = useState<any>({});
    const bedsContext = useContext(BedsContext);
    const activeBedId = bedsContext?.activeBedId;

const handleSubmit = async () => {
  try {
    let url = "";
    let payload: any = {};

        const plantingDate = formValues.planting_date
      ? new Date(formValues.planting_date)
      : new Date();

    if (isNaN(plantingDate.getTime())) {
      console.error("Ungültiges Datum:", formValues.planting_date);
      return;
    }

    if (plantType === "single") {
      url = `/me/garden/individual-plants`;
      payload = {
        planting_date: new Date(formValues.planting_date).toISOString(),
        plantData: {
          name: formValues.name,
          watering_interval: formValues.watering_interval,
          growth_type: "single"
        }
      };
    }

    if (plantType === "bed" && activeBedId !== null && activeBedId !== undefined) {
      url = `/me/garden/beds/${activeBedId}/plants`;
      payload = {
        planting_date: new Date(formValues.planting_date).toISOString(),
        plantData: {
          name: formValues.name,
          watering_interval: formValues.watering_interval,
          growth_type: "bed"
        }
      };
    }

    if (!url) {
      console.error("Kein gültiger PlantType oder BedId");
      return;
    }

const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
  credentials: "include"
});

if (res.ok) {
  window.location.reload();
}

    onClose();
  } catch (err) {
    console.error("Fehler beim Speichern:", err);
  }
};


    return(
        <Dialog open={isOpen} onClose={onClose}>
            <div className="fixed inset-0 bg-black/50 z-40"/>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <DialogPanel className="bg-white/95 p-6 rounded-xl shadow-xl w-110">
                    <DialogTitle className="text-xl font-bold text-darkMint mb-5">Add a new plant</DialogTitle>
                    <PlantDialogue plantType={plantType} onChange={setFormValues}/>
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
    )
}

export default WrapperDialogue;