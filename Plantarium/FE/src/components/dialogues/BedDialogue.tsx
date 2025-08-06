import { Input, Switch } from "@headlessui/react";
import { useState } from "react";
import BedplantDialogue from "./Bedplantdialogue";

function BedDialogue() {
        const [enabled, setEnabled] = useState(false);
    return (
        <>
            <div>
                <p className="mt-3 font-semibold "> Width (m): </p>
                <Input className="mt-2 w-full font-light p-2 border-1 rounded-xl border-darkMint/20" value="3.4"></Input>
                <p className="mt-3 font-semibold "> Height (m): </p>
                <Input className="mt-2 w-full font-light p-2 border-1 rounded-xl border-darkMint/20" value="0.2"></Input></div>
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