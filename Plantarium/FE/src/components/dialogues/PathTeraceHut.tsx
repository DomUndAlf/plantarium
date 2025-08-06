import { Input } from "@headlessui/react";

function PathTeraceHut() {
    return(
        <>
        <div>
                        <p className="mt-3 font-semibold "> Width (m): </p>
                        <Input className="mt-2 w-full font-light p-2 border-1 rounded-xl border-darkMint/20" value="3.4"></Input>
                        <p className="mt-3 font-semibold "> Height (m): </p>
                        <Input className="mt-2 w-full font-light p-2 border-1 rounded-xl border-darkMint/20" value="0.2"></Input></div>
                    <div className="m-4 ml-0 flex items-center"></div>
        </>
    )
}

//hier muss nochmal bestimmt werden welche struktur es ist, um das richtige bild zu rendern
//oder besser übergeordnet?

export default PathTeraceHut;