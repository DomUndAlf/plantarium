
import BedDialogue from "./BedDialogue";
import BedplantDialogue from "./Bedplantdialogue";
import { DialogType } from "./Dialogcontext";
import PlantDialogue from "./PlantDialogue";
import StructureDialogue from "./StructureDialogue";

function Dialoge({ activeDialog }: { activeDialog: DialogType }) {

    switch (activeDialog) {
        case "bed":
            return <BedDialogue />;

        case "plant":
            return <PlantDialogue />;

        case "structure":
            return <StructureDialogue />;

        case "bedplant":
            return <BedplantDialogue />; //DAS SIND DIE FENSTER IN DER SIDEBAR DU DEPP LOL
    }

}

export default Dialoge;