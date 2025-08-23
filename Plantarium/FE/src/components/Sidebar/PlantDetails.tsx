import { Button } from "@headlessui/react";
import { useContext } from "react";
import { DialogContext } from "../dialogues/Dialogcontext";
import { SinglePlantContext } from "../mainStructure/MainFrame";



function PlantDetails() {
  const { singularPlants } = useContext(SinglePlantContext) as {
    singularPlants: any[];
    setSingularPlants: (updater: any[] | ((prev: any[]) => any[])) => void;
  };

  const dialog = useContext(DialogContext);
  return (
  <>
    <h2 className="pl-8"> singular plants</h2>
    {singularPlants.map((i) => (
    <div className="flex items-center flex-col">
      <div className="w-90 p-5 bg-white/80 text-black rounded-xl mb-3">
        <p className="font-light">id: {i.plant_id}</p>
        <p className="font-light">name: {i.plants.name}</p>
        <p className="font-semibold">edible: {i.plants.edible}</p>
        <p className="font-semibold">planted on: {i.planting_date}</p>
        <p className="font-semibold">location in garden: {i.x_position}, {i.y_position}</p>
      </div>
      </div>
    ))}
        <Button className="m-3 p-2 pl-3 pr-3 rounded-xl text-white bg-mint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
          delete  </Button>
      
      <Button onClick={() => dialog.setActiveDialog("plant-single")} className="m-3 p-2 pl-3 pr-3 rounded-xl bg-darkMint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
        add new singular plant </Button>
  </>
  )
}

export default PlantDetails;