import { Button } from "@headlessui/react";
import { useContext } from "react";
import { DialogContext } from "../dialogues/Dialogcontext";
import { SinglePlantContext } from "../../contexts";

function PlantDetails() {
  const { singularPlants } = useContext(SinglePlantContext) as {
    singularPlants: any[];
    setSingularPlants: (updater: any[] | ((prev: any[]) => any[])) => void;
  };

  const dialog = useContext(DialogContext);
  return (
    <>
      {singularPlants.length !== 0 &&
        <h2 className="pl-8"> singular plants</h2>
      }
      {singularPlants.map((i) => (
        <div className="flex items-center flex-col  rounded-xl  bg-white/80 ">
          <div className="w-90 p-5 pb-1 text-black">
            <p className="font-semibold mb-3"> {i.plants.name} </p>
            <p className="font-normal">id: {i.plant_id}</p>
            <p className="font-normal">edible: {i.plants.edible ? "yes" : "no"}</p>
            <p className="font-normal">planted on: {new Date(i.planting_date).toLocaleDateString()}</p>
            <p className="font-normal">location in garden: {i.x_position / 100}m, {i.y_position / 100}m</p>
            <div className="flex justify-center">
              <Button className="m-4 p-2 pl-3 pr-3 w-30 rounded-xl text-white bg-mint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
                delete  </Button>
            </div>

          </div>
        </div>
      ))}
      <div>

        <div className="flex items-center flex-col">
          <Button onClick={() => dialog.setActiveDialog("plant-single")} className="m-3 mt-2 p-2 pl-3 pr-3 rounded-xl bg-darkMint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
            add new singular plant </Button>
        </div>
      </div>
    </>
  )
}

export default PlantDetails;