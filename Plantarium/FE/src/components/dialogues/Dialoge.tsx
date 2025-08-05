
import BedDialogue from "./BedDialogue";
import BedplantDialogue from "./Bedplantdialogue";
import { DialogType } from "./Dialogcontext";
import PlantDialogue from "./PlantDialogue";
import StructureDialogue from "./StructureDialogue";

type Props = {
  activeDialog: DialogType;
  onClose: () => void;
};

function Dialoge({ activeDialog, onClose }: Props) {

    switch (activeDialog) {
        case "bed":
            return <BedDialogue />;

        case "plant":
            return <PlantDialogue />;

        case "structure":
            return <StructureDialogue isOpen={true} onClose={onClose}/>;

        case "bedplant":
            return <BedplantDialogue />;
    }

}

export default Dialoge;