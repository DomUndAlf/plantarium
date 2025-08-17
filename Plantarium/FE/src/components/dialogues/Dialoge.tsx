
import { IStructure } from "../../interfaces/interfaces";
import BedplantDialogue from "./Bedplantdialogue";
import { DialogType } from "./Dialogcontext";
import PlantDialogue from "./PlantDialogue";
import StructureDialogue from "./StructureDialogue";

type Props = {
  activeDialog: DialogType;
  onClose: () => void;
  setPendingStruct: (s: IStructure) => void;
  setIsPlacing: (v: boolean) => void;
};

function Dialoge({ activeDialog, onClose, setIsPlacing, setPendingStruct}: Props) {

    switch (activeDialog) {
        case "plant":
            return <PlantDialogue isOpen={true} onClose={onClose} setPendingStruct={setPendingStruct} setIsPlacing={setIsPlacing}/>;

        case "structure":
            return <StructureDialogue isOpen={true} onClose={onClose} setPendingStruct={setPendingStruct} setIsPlacing={setIsPlacing}/>;

        case "bedplant":
            return <BedplantDialogue />; //hier muss dann was anderes hin, eine neue komponente, weil bedplantdialogue innerhalb der bed structure benutzt wird
    }

}

export default Dialoge;