import { Button } from "@headlessui/react";
import { useContext } from "react";
import { DialogContext } from "../dialogues/Dialogcontext";



function PlantDetails() {

  const dialog = useContext(DialogContext);
  return (
    <>
      <h2 className="pl-8"> bed plants</h2>

      <div className="flex items-center flex-col">
        <div className="w-90 p-5 bg-white/80 text-black rounded-xl mb-3">
          <p className="font-semibold">name:</p>
          <p className="font-semibold">water need:</p>
          <p className="font-semibold">needs watering:</p>
          <p className="font-semibold">planted on:</p>
          <p className="font-semibold">location in garden: bedID?</p>
          <Button className="m-3 p-2 pl-3 pr-3 rounded-xl bg-darkMint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
            delete  </Button>
        </div>
        <Button onClick={() => dialog.setActiveDialog("plant")} className="m-3 p-2 pl-3 pr-3 rounded-xl bg-darkMint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
          add new bed plant </Button>
      </div>
    </>
  )
}

export default PlantDetails;