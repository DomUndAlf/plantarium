import { Button } from "@headlessui/react";

function BedplantDetails() {
    return (
        <div className="flex items-center flex-col">
            <div className="w-90 p-5 bg-white/80 text-black rounded-xl mb-3">
                <p className="font-semibold">Art:</p>
                <p className="font-semibold">Höhe:</p>
                <p className="font-semibold">Breite:</p>
                <p className="font-semibold">Gepflanzt am:</p>
                {/* soll man hier noch location im garten anzeigen? */}
            </div>
            <Button className="m-3 p-2 pl-3 pr-3 rounded-xl bg-darkMint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
                add new bedplant </Button>
        </div>
    );
}

export default BedplantDetails;