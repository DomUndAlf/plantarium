import { useState } from "react";
import PlantDialogue from "./Plantdia/Plantdialogue";
import { IBed, IStructure } from "../../interfaces/interfaces";
import PathTeraceHut from "./PathTeraceHut";

type Props = {
    structBed: IStructure | IBed;
    setStructBed: (value: IStructure | IBed) => void;
    type: string;
};

function BedDialogue({ structBed, setStructBed }: Props) {
    // @ts-ignore
    const [enabled, setEnabled] = useState(false);
    return (
        <>
            <PathTeraceHut struct={structBed} setStruct={setStructBed} type="bed" />
            {enabled && <PlantDialogue plantType={"bed"}  />}
        </>
    )
}

export default BedDialogue;