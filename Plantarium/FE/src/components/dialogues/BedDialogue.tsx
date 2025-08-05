import { Button } from "@headlessui/react";

function BedDialogue() {
    return (<div className="z-50">
        <p className="bg-amber-600"> Blumenbeet </p>
        <Button className="m-3 p-2 pl-3 pr-3 rounded-xl bg-darkMint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150"> Fertig & Speichern </Button>
        <Button className="m-3 p-2 pl-3 pr-3 rounded-xl bg-darkMint/80 font-normal hover:bg-/50 active:scale-97 transition duration-150"> Weiteres Beet hinzufügen</Button>
    </div>
    )
}

export default BedDialogue;

//als nächstes: Dialog aus headless nutzen mit state management 