import { Switch } from "@headlessui/react";
import { useState } from "react";
import BedplantDialogue from "./Bedplantdialogue";
import { IStructureManualInput } from "../../interfaces/interfaces";
import PathTeraceHut from "./PathTeraceHut";

type Props = {
    struct: IStructureManualInput;
    setStruct: (value: IStructureManualInput) => void;
    type: string;
};

function BedDialogue({ struct, setStruct }: Props) {
    const [enabled, setEnabled] = useState(false);
    return (
        <>
            <PathTeraceHut struct={struct} setStruct={setStruct} type="bed" />

            <div className="m-4 ml-0 flex items-center">
                <Switch checked={enabled} onChange={setEnabled} className="m-2 ml-0 group relative flex h-7 w-14 cursor-pointer rounded-full bg-mint p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-darkMint data-focus:outline data-focus:outline-white" >
                    <span aria-hidden="true" className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7" />
                </Switch>

                <span className="text-md ml-2 text-black font-medium">
                    I want to add plants to this bed now
                </span>
            </div>

            {enabled && <BedplantDialogue />}
        </>
    )
}

export default BedDialogue;

//als nächstes: Dialog aus headless nutzen mit state management 