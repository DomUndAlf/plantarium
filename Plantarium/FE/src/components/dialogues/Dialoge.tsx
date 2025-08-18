
import { IStructure } from "../../interfaces/interfaces";
import { DialogType } from "./Dialogcontext";
import PlantDialogue from "./Plantdia/Plantdialogue";
import WrapperDialogue from "./Plantdia/WrapperDialogue";
import StructureDialogue from "./StructureDialogue";

type Props = {
    activeDialog: DialogType;
    onClose: () => void;
    setPendingStruct: (s: IStructure) => void;
    setIsPlacing: (v: boolean) => void;

};

function Dialoge({ activeDialog, onClose, setIsPlacing, setPendingStruct }: Props) {

    switch (activeDialog) {
        case "plant-single":
            return (
                <WrapperDialogue isOpen={true} onClose={onClose} plantType="single" />
            );

        case "plant-bed":
            return (
                <WrapperDialogue isOpen={true} onClose={onClose} plantType="bed" />
            );

        case "structure":
            return <StructureDialogue isOpen={true} onClose={onClose} setPendingStruct={setPendingStruct} setIsPlacing={setIsPlacing} />;

        case "bedplant":
            return <PlantDialogue plantType="bed" />;
    }

}

export default Dialoge;