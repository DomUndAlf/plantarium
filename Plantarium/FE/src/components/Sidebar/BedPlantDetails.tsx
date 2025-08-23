import { Button } from "@headlessui/react";
import { BedsContext } from "../mainStructure/MainFrame";
import { useContext } from "react";
import { IBed } from "../../interfaces/interfaces";

function PlantDetails() {

  const { beds } = useContext(BedsContext) as { beds: IBed[]; setBeds: (updater: IBed[] | ((prev: IBed[]) => IBed[])) => void; };

  return (
    <>
      <h2 className="pl-8">Bed plants</h2>
      {beds.map((i) => {
        const bp = i.bed_plants[0];
        if (!bp) return null;

        return (
          <div key={i.id} className="flex items-center flex-col">
            <div className="w-90 p-5 bg-white/80 text-black rounded-xl mb-3">
              <p className="font-semibold mb-3"> {bp.plants?.name}</p>
              <p className="font-normal"> needs watering: {bp.plants?.watered ? "No" : "Yes"} </p>
              <p className="font-normal"> planted on: {new Date(bp.planting_date).toLocaleDateString()} </p>
              <p className="font-normal">edible: {bp.plants?.edible ? "yes" : "no"}</p>
              <p className="font-normal">location in garden: Bed {i.id}</p>
              <div className="flex justify-center">
                <Button className="m-3 p-2 pl-3 pr-3 w-30 rounded-xl text-white bg-mint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
                  delete
                </Button>
              </div>
              
            </div>
          </div>
        );
      })}
    </>
  );
}

export default PlantDetails;